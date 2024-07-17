// models/buku.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Buku = sequelize.define('Buku', {
  ID_buku: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  judul: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.ENUM('Fiction', 'Non-Fiction', 'Science', 'History'),
    allowNull: false,
  },
  genre: {
    type: DataTypes.ENUM('Fantasy', 'Thriller', 'Romance', 'Biography'),
    allowNull: false,
  },
  // gambar: {
  //   type: DataTypes.STRING,
  //   allowNull: true,
  // },
});

module.exports = Buku;
