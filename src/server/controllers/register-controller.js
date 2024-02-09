import Models from '../models/index.js';
import { getCourseByFormKey, FormTypes } from '../services/form-keys-service.js';

export async function index(req, res) {
    const formKeyString = req.params['key'];
    const course = await getCourseByFormKey(formKeyString, FormTypes.REGISTER);

    if (course) {
        res.render('register', { title: course.name, layout: './layouts/main', courseName: course.name })
    } else {
        res.sendStatus(404);
    }
}

export async function register(req, res) {
    const formKeyString = req.params['key'];
    const course = await getCourseByFormKey(formKeyString, FormTypes.REGISTER);
    
    if (!course) {
        res.sendStatus(404);
        return;
    }

    const studentData = {
        ...req.body,
        courseId: course.id,
        photo: req.file?.filename
    };

    delete studentData['visitorId'];

    await Models.Student.create(studentData);

    res.redirect('/register/thanks');
}

export function thanks(req, res) {
    res.render('register-thanks', { title: 'Регистрация', layout: './layouts/main' });
}