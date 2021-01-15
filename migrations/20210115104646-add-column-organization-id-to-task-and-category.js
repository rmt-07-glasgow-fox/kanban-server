'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Tasks', 'OrganizationId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Organizations',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })
    await queryInterface.addColumn('Categories', 'OrganizationId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Organizations',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Tasks', 'OrganizationId')
    await queryInterface.removeColumn('Categories', 'OrganizationId')
  }
};
