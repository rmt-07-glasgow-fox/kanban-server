'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class KanbanList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      KanbanList.belongsTo(models.User)
    }
  };
  KanbanList.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `Must be filled`
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `Must be filled`
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `Must be filled`
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: (list, option) => {
        if (list.category == "") {
          list.category = "Backlog"
        }
      }
    },
    sequelize,
    modelName: 'KanbanList',
  });
  return KanbanList;
};