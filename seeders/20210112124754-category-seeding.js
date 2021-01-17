"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const categories = [
      {
        name: "backlog",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "todo",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "doing",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "done",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert("Categories", categories, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
