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
   let categoryData = [
      {
        id : 1,
        category: 'Back-Log'
      },
      {
        id : 2,
        category: 'Todo'
      },
      {
        id : 3,
        category: 'Done'
      },
      {
        id : 4,
        category: 'Completed'
      }
   ]
    categoryData.forEach(e => {
      e.createdAt = new Date()
      e.updatedAt = new Date()
    });

   await queryInterface.bulkInsert('Categories', categoryData, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
