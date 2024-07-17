const { Sequelize } = require('sequelize');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
  dialectModule: require('mysql2'),
  logging: console.log,
  dialectOptions: {
    ssl: {
      ca: fs.readFileSync(path.join(__dirname, '/ca-certificate.crt')).toString(),
      rejectUnauthorized: false, // Change this to true in production for security
    }
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 60000,  // Increase acquire timeout
    idle: 10000
  },
  retry: {
    match: [/ETIMEDOUT/],
    max: 3 // Retry connecting up to 3 times
  }
});

sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
  })
  .catch(err => {
    console.error('Error synchronizing database:', err);
  });

module.exports = sequelize;
