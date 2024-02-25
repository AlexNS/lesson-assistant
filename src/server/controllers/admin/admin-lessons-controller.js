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

export async function getAttendance(req, res) {
    const submissions = await Models.AttendanceSubmission.findAll({
        include: [{
            model: Models.Student,
            as: 'student'
        }],
        where: {
            lessonId: req.params.id
        }
    });

    res.send(submissions);
}

export async function manualAttendance(req, res) {
    const lessonId = req.params.id;
    const email = req.body.email;

    const lesson = await Models.Lesson.findOne({
        where: {
            id: lessonId
        },
        include: {
            model: Models.Course,
            as: 'course'
        }
    });

    if (!lesson) {
        return res.sendStatus(400);
    }

    const student = await Models.Student.findOne({
        where: {
            email: email,
            courseId: lesson.courseId
        }
    });

    if (!student) {
        res.send(`Student not found in course ${lesson.course.name}`);
        return res.sendStatus(400);
    }

    const existingSubmission = await Models.AttendanceSubmission.findOne({
        where: {
            studentId: student.id,
            lessonId    
        }
    });

    if (existingSubmission) {
        return res.send(existingSubmission);
    }
    
    const submission = await Models.AttendanceSubmission.create({
        studentId: student.id,
        visitorId: 'manual entry',
        lessonId,
        geoData: ''
    });
    res.send(submission);
}