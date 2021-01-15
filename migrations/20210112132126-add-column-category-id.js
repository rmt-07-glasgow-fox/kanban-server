'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn("Tasks", "CategoryId", {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {tableName: "Categories"},
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      })
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn("Tasks", "CategoryId", {})
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
