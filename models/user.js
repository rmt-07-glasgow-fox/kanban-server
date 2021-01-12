'use strict';
const {
  Model
} = require('sequelize');
const {
  hashPassword
} = require("../helpers/bcrypt");

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
        foreignKey: "userId",
      })
      // User.belongsToMany(models.Category, {
      //   through: models.Task,
      //   foreignKey: "userId",
      // })
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "Email already used"
      },
      allowNull: {
        args: false,
        msg: "Category name must be filled"
      },
      validate: {
        notEmpty: {
          args: true,
          msg: "Email must be filled"
        },
        isEmail: {
          args: true,
          msg: "Invalid email format"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: "Category name must be filled"
      },
      validate: {
        notEmpty: {
          args: true,
          msg: "Password must be filled"
        },
        len: {
          args: [6],
          msg: "Password must use at least 6 characters"
        }
      }
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: "Category name must be filled"
      },
      validate: {
        notEmpty: {
          args: true,
          msg: "Full name must be filled"
        },
      }
    } 
  }, {
    hooks: {
      beforeCreate (user, options) {
        user.password = hashPassword(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};