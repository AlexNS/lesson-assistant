'use strict';
import { Model } from 'sequelize';
import User from './user.js';

export default (sequelize, DataTypes) => {
  class FormKey extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FormKey.init({
    key: DataTypes.STRING(100),
    formType: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    entityId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    qrPath: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    createdByUserId: {
      type: DataTypes.INTEGER,
      references: { model: User, key: 'id' },
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'FormKey',
    freezeTableName: true
  });
  return FormKey;
};