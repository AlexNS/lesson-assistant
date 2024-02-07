'use strict';
const bcrypt = require('bcrypt');

const saltRounds = 5;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const phash = await bcrypt.hash('admin', saltRounds);

    await queryInterface.bulkInsert('Users', [{
         firstName: 'Alex',
         lastName: 'S',
         login: 'alex',
         email: 'a@b.c',
         passwordHash: phash,
         createdAt: new Date(),
         updatedAt: new Date()
       }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
