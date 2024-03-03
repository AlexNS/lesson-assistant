'use strict';
import { Model } from 'sequelize';
import Student from './student.js';
import Lesson from './lesson.js';

export default (sequelize, DataTypes) => {
  class AttendanceSubmission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Student, { foreignKey: 'studentId', as: 'student' });
      this.belongsTo(models.Lesson, { foreignKey: 'lessonId', as: 'lesson' });
    }
  }
  AttendanceSubmission.init({
    studentId: {
      type: DataTypes.INTEGER,
      references: {
        model: Student,
        key: 'id',
      }
    },
    visitorId: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    geoData: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    lessonId: {
      type: DataTypes.INTEGER,
      references: {
        model: Lesson,
        key: 'id',
      }
    },
    invalid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'AttendanceSubmission',
    freezeTableName: true
  });
  return AttendanceSubmission;
};