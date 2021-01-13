'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('Categories', [
     { tag: "To-Do", createdAt: new Date(), updatedAt: new Date() },
     { tag: "Doing", createdAt: new Date(), updatedAt: new Date() },
     { tag: "Done", createdAt: new Date(), updatedAt: new Date() }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {})
  }
};
