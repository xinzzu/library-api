const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Anggota = require('./anggota'); // Import model Anggota
const Buku = require('./buku'); // Import model Buku

const Peminjaman = sequelize.define('Peminjaman', {
  ID_pinjam: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ID_anggota: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Anggota, // Referensi ke model Anggota
      key: 'ID_anggota',
    },
  },
  ID_buku: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Buku, // Referensi ke model Buku
      key: 'ID_buku',
    },
  },
  kode_pinjam: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tgl_pinjam: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  tgl_habis_pinjam: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  tgl_kembali: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  timestamps: true,
});

module.exports = Peminjaman;
