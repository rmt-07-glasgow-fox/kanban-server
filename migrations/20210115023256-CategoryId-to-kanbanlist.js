'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('KanbanLists', 'CategoryId', {
      type: Sequelize.INTEGER,
      references: {
        model: {tableName: "Categories"},
        key: "id"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('KanbanLists', 'CategoryId')
  }
};
