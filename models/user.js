'use strict';
const {
  Model
} = require('sequelize');

const {hashPass} = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Task, {foreignKey: 'userId'})
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: `Email is required!!`
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
          msg: `Name is required!!`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate:{
        len:{
          args: [6],
          msg: `Password minimum characters is 6`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user, options)=>{
    user.password = hashPass(user.password)
  })

  return User;
};