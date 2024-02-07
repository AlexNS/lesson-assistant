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
    firstName: DataTypes.STRING(100),
    middleName: { 
      type: DataTypes.STRING(100),
      allowNull: true
    },
    lastName: DataTypes.STRING(100),
    email: DataTypes.STRING(300),
    login: DataTypes.STRING(100),
    passwordHash: DataTypes.STRING(300,)
  }, {
    sequelize,
    modelName: 'User',
    freezeTableName: true
  });
  return User;
};