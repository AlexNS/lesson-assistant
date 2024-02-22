import Models from '../../models/index.js';
import { parseISO } from 'date-fns';

export async function get(req, res) {
    const lessons = await Models.Lesson.findAll({
            order: [ ['createdAt', 'ASC']] 
        });
    res.send(lessons);
}

export async function create(req, res) {
    const date = parseISO(req.body.date);

    const lesson = await Models.Lesson.create({
        title: req.body.title,
        date,
        courseId: 1
    });
    res.send(lesson);
}

export async function getSingle(req, res) {
    const lesson = await Models.Lesson.findOne({
        where: {
            id: req.params.id
        }
    });

    res.send(lesson);
}