'use strict';

const { hashPassword } = require('../helpers/hash');

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Users', [{
            firstName: 'Mochammad',
            lastName: 'Trinanda',
            email: 'm.trinandanoviardy@gmail.com',
            password: hashPassword('qwerty'),
            createdAt: new Date(),
            updatedAt: new Date(),
        }, {
            firstName: 'Pevita',
            lastName: 'Pearce',
            email: 'pevitapearce@gmail.com',
            password: hashPassword('qwerty'),
            createdAt: new Date(),
            updatedAt: new Date(),
        }])
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Users', [{
            firstName: 'Mochammad',
            lastName: 'Trinanda',
            email: 'm.trinandanoviardy@gmail.com'
        }, {
            firstName: 'Pevita',
            lastName: 'Pearce',
            email: 'pevitapearce@gmail.com'
        }])
    }
};