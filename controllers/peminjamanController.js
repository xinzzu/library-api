const  Peminjaman  = require('../models/peminjaman');

// Controller functions
exports.getAllPeminjaman = async (req, res) => {
  try {
    const peminjamans = await Peminjaman.findAll();
    res.json(peminjamans);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getPeminjamanById = async (req, res) => {
  const { id } = req.params;
  try {
    const peminjaman = await Peminjaman.findByPk(id);
    if (!peminjaman) {
      res.status(404).json({ error: 'Peminjaman not found' });
    } else {
      res.json(peminjaman);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createPeminjaman = async (req, res) => {
  const { ID_anggota, ID_buku, kode_pinjam, tgl_pinjam, tgl_habis_pinjam } = req.body;
  try {
    const newPeminjaman = await Peminjaman.create({ ID_anggota, ID_buku, kode_pinjam, tgl_pinjam, tgl_habis_pinjam });
    res.status(201).json(newPeminjaman);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create peminjaman' });
  }
};

exports.updatePeminjaman = async (req, res) => {
  const { id } = req.params;
  const { ID_anggota, ID_buku, kode_pinjam, tgl_pinjam, tgl_habis_pinjam, tgl_kembali } = req.body;
  try {
    const peminjaman = await Peminjaman.findByPk(id);
    if (!peminjaman) {
      res.status(404).json({ error: 'Peminjaman not found' });
    } else {
      await peminjaman.update({ ID_anggota, ID_buku, kode_pinjam, tgl_pinjam, tgl_habis_pinjam, tgl_kembali });
      res.json(peminjaman);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update peminjaman' });
  }
};

exports.deletePeminjaman = async (req, res) => {
  const { id } = req.params;
  try {
    const peminjaman = await Peminjaman.findByPk(id);
    if (!peminjaman) {
      res.status(404).json({ error: 'Peminjaman not found' });
    } else {
      await peminjaman.destroy();
      res.json({ message: 'Peminjaman deleted successfully' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete peminjaman' });
  }
};
