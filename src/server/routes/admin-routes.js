import { AuthConfig } from "../config/config.js";
import {Router} from "express";
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import bcrypt from 'bcrypt'
import jwt from 'jwt-simple';

import Models from '../models/index.js';

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = AuthConfig.jwtSecret;
opts.audience = 'la.alexns.pro';

passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
    Models.User.findOne({
        where: {id: jwtPayload.id}
    }).then(user => {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));


const router = Router();

router.get('/admin*', (req, res) => {
    res.render('admin');
});
  

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


router.get('/api/something', passport.authenticate('jwt', { session: false }), (req, res) => {

});

export default router;