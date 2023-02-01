'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('roles', {
      name: {
        type: Sequelize.DataTypes.STRING,
        primaryKey: true,
      },
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('roles');
  },
};
