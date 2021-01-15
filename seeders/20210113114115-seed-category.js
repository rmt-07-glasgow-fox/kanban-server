'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const categories = [
      {
        name: 'Backlog',
        color: 'black',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Todo',
        color: 'red',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'In-progress',
        color: 'orange',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Complete',
        color: 'green',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]
      
    await queryInterface.bulkInsert ('Categories', categories)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete ('Categories')
  }
};
