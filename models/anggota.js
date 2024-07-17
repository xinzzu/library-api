// models/anggota.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Anggota = sequelize.define('Anggota', {
  ID_anggota: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tgllahir: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  denda: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('pustakawan', 'anggota'),
    allowNull: false
},
});

module.exports = Anggota;
