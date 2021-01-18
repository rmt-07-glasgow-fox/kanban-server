'use strict';
const data = [
  {
    name: 'Backlog',
    UserId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Todo',
    UserId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Doing',
    UserId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Done',
    UserId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', data)
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
    await queryInterface.bulkDelete('Categories', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
