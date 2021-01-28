'use strict';
const{ hashPassword} = require('../helper/bcrypt')

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
      User.hasMany(models.Task)
      // define association here
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'email already been taken'
      },
      validate: {
        isEmail: {
          args: true,
          msg: "invalid email format"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6],
          msg: "password must be at least 6 characters"
        }
      }
    }
  }, {hooks: {
    beforeCreate: (user) => {
      user.password = hashPassword(user.password)

    }
  },
    sequelize,
    modelName: 'User',
  });
  return User;
};