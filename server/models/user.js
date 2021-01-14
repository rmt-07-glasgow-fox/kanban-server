'use strict';
const {
  Model
} = require('sequelize');

const { hashpassword } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Task, { foreignKey: 'user_id' })
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid email format'
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        checkLength(value) {
          if (value.length < 6) {
            throw new Error('Username length at least 6 characters')
          }
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        checkLength(value) {
          if (value.length < 6) {
            throw new Error('Password length at least 6 characters')
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(user, options) {
        user.password = hashpassword(user.password)
      }
    }
  });
  return User;
};