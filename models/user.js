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
        }
    };
    User.init({
        email: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: "field email is required"
                },
                isEmail: {
                    msg: "invalid email"
                }
            },
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: "field password is required"
                },
                len: {
                    msg: "password at least have 6 character"
                }
            }
        },
        firstName: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: "field first name is required"
                }
            }
        },
        lastName: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: "field last name is required"
                }
            }
        }
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};