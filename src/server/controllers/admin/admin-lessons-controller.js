import Models from '../../models/index.js';
import { parseISO } from 'date-fns';
import { UploadPath } from '../../config/config.js';
import { toFile } from 'qrcode-node';
import { v4 } from 'uuid';

import * as path from 'path';

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


export async function getAttendanceFormInfo(req, res) {
    const form = await Models.FormKey.findOne({
        where: {
            entityId: req.params.id,
            formType: 3
        }
    });

    res.send(form);
}

export async function createAttendanceForm(req, res) {
    const lessonId = req.params.id;

    const form = await Models.FormKey.findOne({
        where: {
            entityId: req.params.id,
            formType: 3
        }
    });

    if (form) {
        res.send(form);
        return;
    }
    
    const { default: ShortUniqueId } = await import('short-unique-id');

    const uid = new ShortUniqueId({ length: 7 });
    const key = uid.rnd();
    const qrPath = path.join(UploadPath, `qr_${v4()}.svg`);
    const qrText = `url:https://la.alexns.pro/attendance/${key}`

    toFile(
        qrPath,
        qrText,
        {
            type: 'svg'
        },
        async (err) => {
            if (!err) {
                const result = await Models.FormKey.create({
                    key,
                    formType: 3,
                    entityId: lessonId,
                    qrPath: qrPath,
                    active: true,
                    createdByUserId: req.user.id
                })
            
                res.send(result);
            } else {
                res.sendStatus(500);
                res.send(err);
            }
        }
    )
}


export async function setAttendanceFormActiveStatus(req, res) {
    const lessonId = req.params.id;

    const form = await Models.FormKey.findOne({
        where: {
            entityId: req.params.id,
            formType: 3
        }
    });

    if (!form) {
        res.sendStatus(400);
        return;
    }

    const newActiveFlagValue = req.params.status == 'enable';

    const result = await Models.FormKey.update(
        {
            active: newActiveFlagValue
        },
        {
            where:{
                id: form.id
            }
        }
    );

    res.send(result);
}