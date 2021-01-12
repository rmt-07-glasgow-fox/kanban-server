'use strict';
const {
  Model
} = require('sequelize');
const {hasher} = require("../helpers/hash")

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.KanbanList)
    }
  };
  User.init({
    firstName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `Must be filled`
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `Must be filled`
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `Must be filled`
        },
        isEmail: {
          msg: `Invalid email format`
        }
      },
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `Must be filled`
        },
        len: {
          args: [6],
          msg: `Password at least contain 6 characters`
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (user, option) => {
        user.password = hasher(user.password)
      }
    },
    modelName: 'User',
  });
  return User;
};