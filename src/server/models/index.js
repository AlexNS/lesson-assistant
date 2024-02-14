'use strict';

import { Sequelize } from 'sequelize';
import { DbConfig } from '../config/config.js';

const db = {};

const sequelize = new Sequelize({
  host: DbConfig.hostname,
  database: DbConfig.database,
  username: DbConfig.username,
  password: DbConfig.password,
  dialect: DbConfig.dialect
});
  
import UserModule from './user.js';
import CourseModule from './course.js';
import StudentModule from './student.js';
import FormKeyModule from './form-key.js';
import QuestionModule from './question.js';
import LessonModule from './lesson.js';
import AttendanceSubmissionModule from './attendance-submission.js';

[UserModule, CourseModule, StudentModule, LessonModule,
  FormKeyModule, QuestionModule, AttendanceSubmissionModule].forEach((mod) => {
  const model = mod(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
})

db.sequelize = sequelize;
db.Sequelize = Sequelize;

console.log('Models created');

export default db;
