const  Anggota  = require('../models');

// Controller functions
exports.getAllAnggota = async (req, res) => {
  try {
    const anggotas = await Anggota.findAll();
    res.json(anggotas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAnggotaById = async (req, res) => {
  const { id } = req.params;
  try {
    const anggota = await Anggota.findByPk(id);
    if (!anggota) {
      res.status(404).json({ error: 'Anggota not found' });
    } else {
      res.json(anggota);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createAnggota = async (req, res) => {
  const { username, password, nama, tgllahir, denda } = req.body;
  try {
    const newAnggota = await Anggota.create({ username, password, nama, tgllahir, denda });
    res.status(201).json(newAnggota);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create anggota' });
  }
};

exports.updateAnggota = async (req, res) => {
  const { id } = req.params;
  const { username, password, nama, tgllahir, denda } = req.body;
  try {
    const anggota = await Anggota.findByPk(id);
    if (!anggota) {
      res.status(404).json({ error: 'Anggota not found' });
    } else {
      await anggota.update({ username, password, nama, tgllahir, denda });
      res.json(anggota);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update anggota' });
  }
};

exports.deleteAnggota = async (req, res) => {
  const { id } = req.params;
  try {
    const anggota = await Anggota.findByPk(id);
    if (!anggota) {
      res.status(404).json({ error: 'Anggota not found' });
    } else {
      await anggota.destroy();
      res.json({ message: 'Anggota deleted successfully' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete anggota' });
  }
};
