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
      User.hasMany(models.Task, {
        foreignKey: "UserId"
      })
    }
  };
  User.init({
    name: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Name Is Required" }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: { msg: "Invalid Email Format"},
        notEmpty: { msg: "Email required"},
        notNull: { msg: "Email required"},
        dupEmail(value) {
          return User.findAll ({ where: {email: value}})
          .then(user => {
            if (user.length != 0) {
              throw new Error("This email has been taken")
            }
          })
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty : { msg : "Password Required"},
        notNull: { msg : "Password Required"}
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};