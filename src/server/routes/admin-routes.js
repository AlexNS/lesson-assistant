import { AuthConfig } from "../config/config.js";
import {Router} from "express";
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

import Models from '../models/index.js';
import { main, login } from "../controllers/admin-controller.js";
import * as students from '../controllers/admin/admin-students-controller.js';
import * as questions from '../controllers/admin/admin-questions-controller.js';
import * as lessons from '../controllers/admin/admin-lessons-controller.js';

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
const withAuth = passport.authenticate('jwt', { session: false });

router.get('/admin*', main);
  
router.post('/api/login', login);


router.route('/api/students')
    .all(withAuth)
    .get(students.get);

router.route('/api/questions')
    .all(withAuth)
    .get(questions.get);

router.route('/api/lessons')
    .all(withAuth)
    .get(lessons.get)
    .post(lessons.create);


export default router;