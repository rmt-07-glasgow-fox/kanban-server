'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Organisation extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Organisation.init({
        name: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: 'field name is required'
                }
            }
        },
        ownerId: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: {
                    msg: 'field owner is required'
                }
            }
        }
    }, {
        sequelize,
        modelName: 'Organisation',
    });
    return Organisation;
};