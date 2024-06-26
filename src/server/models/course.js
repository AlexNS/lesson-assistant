'use strict';

import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Course.init({
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Course',
    freezeTableName: true
  });
  return Course;
};