'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Tasks', 'category')
    await queryInterface.addColumn('Tasks', 'CategoryId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Categories',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Tasks', 'category', Sequelize.STRING)
    await queryInterface.removeColumn('Tasks', 'CategoryId')
  }
};
