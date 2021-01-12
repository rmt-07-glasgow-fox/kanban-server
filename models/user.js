'use strict';
const {
    Model
} = require('sequelize');
const { hashPassword } = require('../helpers/hash');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.belongsToMany(models.Organisation, { as: 'organisation', foreignKey: 'userId', through: models.UserOrganisation })
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
        hooks: {
            beforeCreate(instance) {
                instance.password = hashPassword(instance.password)
            }
        }
    });
    return User;
};