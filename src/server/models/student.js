'use strict';
import { Model } from 'sequelize';
import Course from './course.js';

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
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    middleName: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    photo: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
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