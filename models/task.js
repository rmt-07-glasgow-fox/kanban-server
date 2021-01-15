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
      Task.belongsTo(models.User)
    }
  };
  Task.init({
    title:{
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: 'title cannot empty'
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: 'category cannot empty'
        },
        ChooseValidation(value){
          if(value === 'Choose'){
            throw new Error('Please fill category')
          }
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: 'description cannot empty'
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};