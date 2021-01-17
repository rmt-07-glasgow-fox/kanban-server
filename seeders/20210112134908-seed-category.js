'use strict';
const categoryData = require('../data/category.json')
categoryData.forEach(e => {
  e.updatedAt = new Date()
  e.createdAt = new Date()
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', categoryData)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null)
  }
};
