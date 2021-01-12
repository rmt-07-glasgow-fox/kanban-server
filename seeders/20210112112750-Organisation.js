'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Organisations', [
            { name: 'black fox', ownerId: 1, createdAt: new Date(), updatedAt: new Date() },
            { name: 'glasglow fox', ownerId: 1, createdAt: new Date(), updatedAt: new Date() },
            { name: 'vintage fox', ownerId: 1, createdAt: new Date(), updatedAt: new Date() },
        ]);
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Organisations', [
            { name: 'black fox', ownerId: 1 },
            { name: 'glasglow fox', ownerId: 1 },
            { name: 'vintage fox', ownerId: 1 },
        ]);
    }
};