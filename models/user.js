'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Organization, { through: models.Member, foreignKey: "userId" });
      User.hasMany(models.Task, { foreignKey: "userId" });
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Username required!"
        }
      },
      unique: {
        msg: "Username already used!"
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Email required!"
        },
        isEmail: {
          msg: "Invalid email adress!"
        }
      },
      unique: {
        msg: "Email already used!"
      }
    },
    password:  {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Password required!"
        },
        len: {
          args: [6],
          msg: "Password must be at least 6 characters!"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user, options) => {
    user.password = hashPassword(user.password);
  });

  return User;
};