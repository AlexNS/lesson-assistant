'use strict';
import { Model } from 'sequelize';
import Course from './Course.js';

export default (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Student.init({
    firstName: DataTypes.STRING(100),
    middleName: DataTypes.STRING(100),
    lastName: DataTypes.STRING(100),
    email: DataTypes.STRING(300),
    photo: DataTypes.STRING(300),
    courseId: {
      type: DataTypes.INTEGER,
      references: {
        model: Course,
        key: 'id',
      }
    },
  }, {
    sequelize,
    modelName: 'Student',
    freezeTableName: true
  });
  return Student;
};