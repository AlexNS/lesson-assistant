import { AuthConfig } from "../config/config.js";
import {Router} from "express";
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

import Models from '../models/index.js';
import { main, login } from "../controllers/admin-controller.js";
import * as students from '../controllers/admin/admin-students-controller.js';
import * as questions from '../controllers/admin/admin-questions-controller.js';
import * as lessons from '../controllers/admin/admin-lessons-controller.js';
import * as courses from '../controllers/admin/admin-courses-controller.js';

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

router.route('/api/lessons/:id')
    .all(withAuth)
    .get(lessons.getSingle);

router.route('/api/lessons/:id/attendance')
    .all(withAuth)
    .get(lessons.getAttendance)
    .post(lessons.manualAttendance);
    
router.route('/api/lessons/:id/attendance-form')
    .all(withAuth)
    .get(lessons.getAttendanceFormInfo)
    .post(lessons.createAttendanceForm);

router.route('/api/lessons/:id/attendance-form/:status')
    .all(withAuth)
    .post(lessons.setAttendanceFormActiveStatus);


router.route('/api/courses')
    .all(withAuth)
    .get(courses.get);

export default router;