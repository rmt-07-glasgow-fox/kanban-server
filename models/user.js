'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Task)
    }
  };
  User.init({
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        isEmail:{
          msg: `Input Must Be Email Address`
        },
        notNull: {
          msg: `Email Must Be Filled`
        },
        notEmpty: {
          msg: `Email Must Be Filled`
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull: {
          msg: `Password Must Be Filled`
        },
        notEmpty: {
          msg: `Password Must Be Filled`
        },
        len:{
          args: [6,255],
          msg: `Password Have Minimum 6 Character`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user, opt) => {
    const hashed = hashPassword(user.password)
    user.password = hashed
  })

  return User;
};