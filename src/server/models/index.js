'use strict';

import { Sequelize } from 'sequelize';
import { DbConfig } from '../config/config.js';

const db = {};

const sequelize = new Sequelize(DbConfig.database, DbConfig.username, DbConfig.password, DbConfig);

import UserModule from './User.js';
import CourseModule from './Course.js';
import StudentModule from './Student.js';
import FormKeyModule from './FormKey.js';

[UserModule, CourseModule, StudentModule, FormKeyModule].forEach((mod) => {
  const model = mod(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
})

db.sequelize = sequelize;
db.Sequelize = Sequelize;

console.log('Models created');

export default db;
