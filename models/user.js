'use strict';
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
      User.hasMany(models.Task, {foreignKey: 'UserId'})
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: `Email required`
        },
        isEmail:{
          message: `Invalid email format`
        }
      },
      unique: true
    },
    fullname: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: `Name required`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate:{
        len:{
          args: [6],
          msg: `Password must be 6 characters or more`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};