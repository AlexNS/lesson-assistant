import Models from '../models/index.js'
import { getLessonByFormKey, getFormKeyByEntityId, FormTypes } from '../services/form-keys-service.js';
import { format } from 'date-fns';

export async function index(req, res) {
    const formKeyString = req.params['key'];
    const lesson = await getLessonByFormKey(formKeyString, FormTypes.ATTENDANCE);

    if (!lesson) {
        res.sendStatus(404);
        return;
    }

    res.render('attendance', { title: `Отметка`, layout: './layouts/main'});
}

export async function attendanceMark(req, res) {
    const formKeyString = req.params['key'];
    const lesson = await getLessonByFormKey(formKeyString, FormTypes.ATTENDANCE);
    
    if (!lesson) {
        res.sendStatus(404);
        return;
    }

    const student = await Models.Student.findOne({
      where: {
        email: req.body.email
      }
    });
    
    if (!student) {
      res.redirect(`/attendance/not-found/${formKeyString}`);
      return;
    }

    const existingSubmission = await Models.AttendanceSubmission.findOne({
      where: {
        studentId: student.id,
        lessonId: lesson.id
      }
    })
    
    if (!existingSubmission) {
      await Models.AttendanceSubmission.create({
        studentId: student.id,
        visitorId: req.body.visitorId,
        geoData: req.body.geoData,
        lessonId: lesson.id
      });
    }

    res.redirect(`/attendance/thanks/${formKeyString}`);
}

export async function thanks(req, res) {
    const formKeyString = req.params['key'];
    const lesson = await getLessonByFormKey(formKeyString, FormTypes.ATTENDANCE);
    if (lesson) {
        res.render('attendance-thanks', { title: `Отметка по ${lesson.title}`, layout: './layouts/main' });
    } else {
        res.sendStatus(404);
    }
}

export async function notFound(req, res) {
    const formKeyString = req.params['key'];
    const lesson = await getLessonByFormKey(formKeyString, FormTypes.ATTENDANCE);
    if (lesson) {
      const fk = await getFormKeyByEntityId(FormTypes.REGISTER, lesson.courseId);
      res.render('attendance-not-found', { 
        title: `Отметка по ${lesson.title}`, 
        layout: './layouts/main', 
        registerFormKey: fk,
        attendanceFormKey: formKeyString 
      });
    } else {
        res.sendStatus(404);
    } 
}

export function infoForm(req, res) {
  res.render('attendance-info-form', { title: `Информация о присутствии`, layout: './layouts/main'});
}

export async function infoFormPost(req, res) {
    const student = await Models.Student.findOne({
      where: {
        email: req.body.email
      }
    });

    if (!student) {
      return res.sendStatus(404);
    }

    res.redirect(`/attendance/info/${student.id}`)
}

export async function infoFormResult(req, res) {
  const dbSubmissions = await Models.AttendanceSubmission.findAll({
    include: [{
        model: Models.Lesson,
        as: 'lesson'
    }],
    where: {
        studentId: req.params.studentId
    }
  });

  const formatDate = (date) => format(date, 'dd.MM.yyyy hh:mm');
  const submissions = dbSubmissions.map(s => ({
    infoString: `${formatDate(s.lesson.date)}  ${s.lesson.title}`
  }));

  res.render('attendance-info', { title: 'Информация о присутствии', layout: './layouts/main', submissions})
}