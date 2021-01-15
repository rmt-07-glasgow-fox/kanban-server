'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Tasks', [
            { name: 'CRUD Task', description: 'buat task crud', userId: 1, categoryId: 1, organisationId: 1, createdAt: new Date(), updatedAt: new Date() },
            { name: 'Model Task', description: 'buat task model', userId: 1, categoryId: 1, organisationId: 1, createdAt: new Date(), updatedAt: new Date() },
            { name: 'Migration Task', description: 'buat task migratin', userId: 1, categoryId: 1, organisationId: 1, createdAt: new Date(), updatedAt: new Date() },
        ]);
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Tasks', [
            { name: 'CRUD Task', description: 'buat task crud', userId: 1, categoryId: 1, organisationId: 1 },
            { name: 'Model Task', description: 'buat task model', userId: 1, categoryId: 1, organisationId: 1 },
            { name: 'Migration Task', description: 'buat task migratin', userId: 1, categoryId: 1, organisationId: 1 },
        ]);
    }
};