'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  await queryInterface.addColumn("Tasks", "UserId", {
    type: Sequelize.INTEGER,
    references: {
      model: {
        tableName: "Users"
      },
      key: "id"
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  })
},

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Tasks", "UserId")
  }
};
