'use strict';
const {
  Model
} = require('sequelize');
const { getHashPassword } = require ("../helpers/bcrypt");
const { options } = require('../routes');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany (models.Task, { foreignKey: "UserId" })
    }

  };
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: {
          args: true,
          msg: "Username Should Not Be Empty"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
        notEmpty: {
          args: true,
          msg: "Email Should Not Be Empty"
        },
        isEmail: {
          args: true,
          msg: "Please Insert Your Email Correctly"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        len: {
          args: [6],
          msg: "Minimum Length of Password is 6"
        },
        isAlphanumeric: {
          args: true,
          msg: "Password Must Be Contain Alpha Numeric"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, options) => {
        user.password = getHashPassword(user.password)
      }
    } 
    
  });
  return User;
};