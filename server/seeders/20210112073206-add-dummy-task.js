'use strict';
const data =[
  {
    title: "Task 1",
    category: "Backlog",
    UserId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Task 2",
    category: "Doing",
    UserId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  }
  
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Kanbans', data)
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
    await queryInterface.bulkDelete('Kanbans', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
