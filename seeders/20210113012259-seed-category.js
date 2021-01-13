'use strict';
let categories = [
  {
    name: "Backlog"
  },
  {
    name: "Todo"
  },
  {
    name: "Doing"
  },
  {
    name: "Complete"
  }

]
module.exports = {
  up: async (queryInterface, Sequelize) => {
      categories.forEach(el => {
        el.createdAt = new Date()
        el.updatedAt = new Date()
      })
      await queryInterface.bulkInsert("Categories", categories, {})
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("categories", null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
