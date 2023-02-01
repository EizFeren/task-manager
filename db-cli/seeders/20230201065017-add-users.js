'use strict';

if (!process.env.OWNER_NAME) {
  throw new Error('Owner name is empty');
}

if (!process.env.OWNER_PASSWORD) {
  throw new Error('Owner password is empty');
}

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        name: process.env.OWNER_NAME,
        password: await bcrypt.hash(process.env.OWNER_PASSWORD, 7),
        role: 'owner',
        confirmed: true,
      },
    ]);
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users');
  },
};
