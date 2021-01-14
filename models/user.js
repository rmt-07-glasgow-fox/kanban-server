'use strict';
const {
  Model
} = require('sequelize');
const {hashPassword} = require('../helpers/bcrypt')
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
      allowNull:false,
      validate: {
        isEmail: { args: true, msg: 'invalid email format'},
        notNull: { args: true, msg:'email is required'},
        notEmpty: { args: true, msg: 'email is required'}
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull: { args: true, msg:'passwrod is required'},
        notEmpty: { args: true, msg: 'password is required'},
        min: { args:[6], msg: 'password atleast 6 characters'}
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks:{
      beforeCreate(instance,options) {
        instance.password = hashPassword(instance.password)
      }
    }
  });
  return User;
};