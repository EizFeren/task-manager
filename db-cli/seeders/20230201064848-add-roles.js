'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [
      {
        name: 'owner',
        accessLevel: 0,
      }, {
        name: 'admin',
        accessLevel: 1,
      }, {
        name: 'moderator',
        accessLevel: 2,
      }, {
        name: 'user',
        accessLevel: 3,
      },
    ]);
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles');
  },
};
