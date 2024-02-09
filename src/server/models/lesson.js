'use strict';
import { Model } from 'sequelize';
import Course from './course.js';

export default (sequelize, DataTypes) => {
  class Lesson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Lesson.init({
    title: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    courseId: {
      type: DataTypes.INTEGER,
      references: {
        model: Course,
        key: 'id',
      }
    },
    resolved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Lesson',
    freezeTableName: true
  });
  return Lesson;
};