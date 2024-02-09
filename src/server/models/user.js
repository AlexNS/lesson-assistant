'use strict';

import { Model } from 'sequelize';


export default (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
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
    login: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    passwordHash: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'User',
    freezeTableName: true
  });
  return User;
};