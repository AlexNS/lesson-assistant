import Models from '../../models/index.js';
import { parseISO } from 'date-fns';

export async function get(req, res) {
    const lessons = await Models.Lesson.findAll({
            order: [ ['createdAt', 'ASC']] 
        });
    res.send(lessons);
}

export async function create(req, res) {
    console.log(req.body);

    const date = parseISO(req.body.date);

    const lesson = await Models.Lesson.create({
        title: req.body.title,
        date,
        courseId: 1
    });
    res.send(lesson);
}