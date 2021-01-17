module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories', [
    {
        category: "backlog",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        category: "product",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        category: "development",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        category: "done",
        createdAt: new Date(),
        updatedAt: new Date()
    }
]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};