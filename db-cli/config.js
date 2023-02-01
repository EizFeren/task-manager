'use strict';

if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv');

  dotenv.config();
}

const config = {
  dialect: 'postgres',
  seederStorage: 'sequelize',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

module.exports = {
  development: config,
  test: config,
  production: config,
};
