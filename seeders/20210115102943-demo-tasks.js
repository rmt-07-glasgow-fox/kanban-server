'use strict';
const categories = ["Backlog", "Todo", "Doing", "Completed"]

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
    await queryInterface.bulkInsert('Tasks', [
      {
        title: 'create assocations',
        description: 'define assocations between models',
        category: categories[Math.floor(Math.random() * categories.length)],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'define models',
        description: 'define proper tables of each model',
        category: categories[Math.floor(Math.random() * categories.length)],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'create a plan',
        description: 'define your plan to build an app',
        category: categories[Math.floor(Math.random() * categories.length)],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'learn a framework',
        description: 'using Vue.js for front-end',
        category: categories[Math.floor(Math.random() * categories.length)],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'testing app',
        description: 'validations and user testing',
        category: categories[Math.floor(Math.random() * categories.length)],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'design mockup',
        description: 'go to dribbble',
        category: categories[Math.floor(Math.random() * categories.length)],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'join a seminar',
        description: 'go to webdevfest',
        category: categories[Math.floor(Math.random() * categories.length)],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'prepare seeders',
        description: 'search google for dummy data',
        category: categories[Math.floor(Math.random() * categories.length)],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'amplify your skills',
        description: 'build your rank on edabit',
        category: categories[Math.floor(Math.random() * categories.length)],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Tasks', null, {})
  }
};
