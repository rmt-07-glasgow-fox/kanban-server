'use strict';
const hashPasword = require('../helper/hashPasword')
const {
  Model
} = require('sequelize');
const hashPassword = require('../helper/hashPasword');
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
    email:{
      type: DataTypes.STRING,
      validate:{
        isEmail:{
          msg:'Email format invalid'
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'Username cannot empty'
        },
        len:{
          args: [3],
          msg: 'Username must be minimal in 3 characters length'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'password cannot empty'
        },
        len:{
          args: [6],
          msg: 'password must be minimal in 6 characters length'
        }
      }
    }
  }, {hooks:{
    beforeCreate: (user, options)=>{
      user.password = hashPassword(user.password)
    }
  },
    sequelize,
    modelName: 'User',
  });
  return User;
};