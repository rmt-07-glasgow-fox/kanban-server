'use strict';

const { genPass } = require('../helper/bcrypt')

let user = [{
  email : 'pratama@gmail.com',
  password : genPass('pratama'),
  fullname : 'pratama otori',
  createdAt : new Date(),
  updatedAt : new Date()
}, {
  email : 'pratama12@gmail.com',
  password : genPass('pratama'),
  fullname : 'afista pratama',
  createdAt : new Date(),
  updatedAt : new Date()
}]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', user,{})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
