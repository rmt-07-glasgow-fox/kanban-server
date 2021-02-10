'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kanban extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Kanban.belongsTo(models.User)
    }
  };
  Kanban.init({
    title: {
      type:  DataTypes.STRING,
      validate: {
        notEmpty:true
      }
    },
    description: {
      type:  DataTypes.STRING,
      validate: {
        notEmpty:true
      }
    },
    point: {
      type:  DataTypes.INTEGER,
      validate: {
        notEmpty:true
      }
    },
    assignTo: {
      type:  DataTypes.STRING,
      validate: {
        notEmpty:true
      }
    },
    status: {
      type:  DataTypes.STRING,
      validate: {
        notEmpty:true
      }
    },
    UserId: {
      type:  DataTypes.INTEGER,
      validate: {
        notEmpty:true
      }
    },
  }, {
    hooks:{
      beforeCreate:(user)=>{
        user.status = 'BACK-LOG'
      }
    },
    sequelize,
    modelName: 'Kanban',
  });
  return Kanban;
};