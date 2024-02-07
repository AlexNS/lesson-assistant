'use strict';

import { Sequelize } from 'sequelize';
import * as process from 'process';

const env = process.env.NODE_ENV || 'development';
import fullConfig from '../config/config.json' assert { type: 'json' };
const config = fullConfig[env];

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

import UserModule from './User.js';
import CourseModule from './Course.js';
import StudentModule from './Student.js';

[UserModule, CourseModule, StudentModule].forEach((mod) => {
  const model = mod(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
})


db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
