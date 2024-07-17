// models/pustakawan.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pustakawan = sequelize.define('Pustakawan', {
  ID_pustakawan: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('pustakawan', 'anggota'),
    allowNull: false
},
});

module.exports = Pustakawan;
