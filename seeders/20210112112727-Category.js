'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Categories', [
            { name: 'backlog', createdAt: new Date(), updatedAt: new Date() },
            { name: 'todo', createdAt: new Date(), updatedAt: new Date() },
            { name: 'doing', createdAt: new Date(), updatedAt: new Date() },
            { name: 'done', createdAt: new Date(), updatedAt: new Date() }
        ]);
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Categories', [
            { name: 'backlog' },
            { name: 'todo' },
            { name: 'doing' },
            { name: 'done' }
        ])
    }
};