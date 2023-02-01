'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [
      {
        name: 'owner',
      }, {
        name: 'admin',
      }, {
        name: 'moderator',
      }, {
        name: 'user',
      },
    ]);
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles');
  },
};
