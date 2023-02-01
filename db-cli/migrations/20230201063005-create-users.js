'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
        defaultValue: queryInterface.sequelize.fn('gen_random_uuid'),
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.DataTypes.STRING,
      },
      role: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'roles',
          key: 'name',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      confirmed: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      blocked: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: queryInterface.sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
      },
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  },
};
