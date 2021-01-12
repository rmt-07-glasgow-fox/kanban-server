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
      User.belongsToMany(models.Category, {
        through: models.Task,
        foreignKey: "userId",
      })
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "Email already used"
      },
      validate: {
        notEmpty: {
          args: true,
          msg: "Email must be filled"
        },
        notNull: {
          args: true,
          msg: "Email must be filled"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Password must be filled"
        },
        notNull: {
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
      validate: {
        notEmpty: {
          args: true,
          msg: "Full name must be filled"
        },
        notNull: {
          args: true,
          msg: "Full name must be filled"
        }
      }
    } 
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};