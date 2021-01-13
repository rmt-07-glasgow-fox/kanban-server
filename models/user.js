'use strict';
const { hashPass } = require('../helpers/bcrypt.js');
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
      // define association here
    }
  };
  User.init({
    firstname: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please insert your first name!'
        },
        len: {
          args: [2],
          msg: 'Minimal length of first name is 2 characters'
        }
      }
    },
    lastname: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please insert your last name!'
        },
        len: {
          args: [2],
          msg: 'Minimal length of last name is 2 characters'
        }
      }
    },
    profpic: { type: DataTypes.STRING },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please insert your email address!'
        }
      },
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please insert your password!'
        },
        len: {
          args: [5],
          msg: 'Minimal length of password is 5 characters'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate(user, options) {
        user.password = hashPass(user.password);

        !user.profpic ? user.profpic = `https://ui-avatars.com/api/?name=${user.firstname}&background=random&length=1&bold=true&color=ffffff` : user.profpic;
      },
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};