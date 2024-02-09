import Models from '../models/index.js'
import { getCourseByFormKey, FormTypes } from '../services/form-keys-service.js';

export async function index(req, res) {
    const formKeyString = req.params['key'];
    const course = await getCourseByFormKey(formKeyString, FormTypes.QUESTION);

    if (course) {
        res.render('question', { title: `Вопросы по ${course.name}`, layout: './layouts/main', courseName: course.name })
    } else {
        res.sendStatus(404);
    }
}

export async function question(req, res) {
    const formKeyString = req.params['key'];
    const course = await getCourseByFormKey(formKeyString, FormTypes.QUESTION);
    
    if (!course) {
        res.sendStatus(404);
        return;
    }

    if (req.body.questionText && req.body.questionText.trim()) {
        await Models.Question.create({
            text: req.body.questionText,
            courseId: course.id
        });
    }
   
    res.redirect('/question/thanks/'+formKeyString);
}

export async function thanks(req, res) {
    const formKeyString = req.params['key'];
    const course = await getCourseByFormKey(formKeyString, FormTypes.QUESTION);
    if (course) {
        res.render('question-thanks', { title: `Вопросы по ${course.name}`, layout: './layouts/main', formKeyString: formKeyString });
    } else {
        res.sendStatus(404);
    }
}