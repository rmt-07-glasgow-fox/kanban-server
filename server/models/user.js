'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Task, { through: models.UserTask, foreignKey: "id" })
      User.hasMany(models.UserTask, { foreignKey: "UserId", targetKey: "id" })
      User.hasMany(models.Category, { foreignKey: "UserId", targetKey: "id" })
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Name Required"
        },
        len: {
          args: [2],
          msg: "Name should be more than 2 characters"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Email Required"
        },
        isEmail: {
          msg: "Should follow email format (ex: foo@mail.com)"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Password Required"
        },
        len: {
          args: [3],
          msg: "Password should be more than 5 characters"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (instance, options) => {
        instance.password = hashPassword(instance.password)
      }
    }
  });
  return User;
};