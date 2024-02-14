import { AuthConfig } from "../config/config.js";
import {Router} from "express";
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import bcrypt from 'bcrypt'
import jwt from 'jwt-simple';

import Models from '../models/index.js';
import { main } from "../controllers/admin-controller.js";

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = AuthConfig.jwtSecret;

passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
    Models.User.findOne({
        where: {id: jwtPayload.id}
    }).then(user => {
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    }).catch(err => {
        return done(err, false);
    });
}));


const router = Router();

router.get('/admin*', main);
  

router.post('/api/login', async (req, res) => {
    const user = await Models.User.findOne({
        where: {
            login: req.body.login
        }
    });

    if (user) {
        bcrypt.compare(req.body.password, user.passwordHash, function(err, result) {
            if (result) {
                const jwtPayload = { 
                    id: user.id, 
                    expire: Date.now() + 1000 * 60 * 60 * 24 * 7
                }

                return res.send({ 
                    token: jwt.encode(jwtPayload, AuthConfig.jwtSecret),
                    userInfo: {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        middleName: user.middleName,
                        email: user.email,
                    }
                });
            } else {
                res.sendStatus(401);
            }
        });
    } else {
        res.sendStatus(401);
    }
});


router.get('/api/students', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const students = await Models.Student.findAll();
    res.send(students);
});

router.get('/api/questions', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const questions = await Models.Question.findAll({
        where: { resolved: false },
        order: [ ['createdAt', 'DESC']] 
    });
    res.send(questions);
});

export default router;