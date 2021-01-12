'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Task extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Task.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
            Task.belongsTo(models.Organisation, { as: 'organisation', foreignKey: 'organisationId' })
            Task.belongsTo(models.Category, { as: 'category', foreignKey: 'categoryId' })
        }
    };
    Task.init({
        name: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: 'field name is required'
                }
            }
        },
        description: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: 'field description is required'
                }
            }
        },
        userId: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: {
                    msg: 'field user is required'
                }
            }
        },
        organisationId: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: {
                    msg: 'field organisation is required'
                }
            }
        },
        categoryId: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: {
                    msg: 'field category is required'
                }
            }
        }
    }, {
        sequelize,
        modelName: 'Task',
    });
    return Task;
};