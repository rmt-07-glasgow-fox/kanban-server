'use strict';
const { encrypt } = require('../helpers')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Kanban)
      User.hasMany(models.Category)
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      unique: {
        arg: true,
        msg: "Username must be unique"
      },
      validate: {
        notEmpty: {
          msg: "Username must be filled"
        },
        len: {
          args: [6],
          msg: "Username minimum 6 characters"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        arg: true,
        msg: "Email must be unique"
      },
      validate: {
        notEmpty: {
          msg: "Email must be filled"
        },
        isEmail: {
          args: true,
          msg: "Email not valid"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Password must be filled"
        },
        len: {
          args: [6],
          msg: "Password minimum 6 characters"
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (instance) => {
        instance.password = encrypt(instance.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};