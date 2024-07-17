const  Buku  = require('../models/buku');

// Controller functions
exports.getAllBuku = async (req, res) => {
  try {
    const bukus = await Buku.findAll();
    res.json(bukus);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getBukuById = async (req, res) => {
  const { id } = req.params;
  try {
    const buku = await Buku.findByPk(id);
    if (!buku) {
      res.status(404).json({ error: 'Buku not found' });
    } else {
      res.json(buku);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createBuku = async (req, res) => {
  const { judul, category, genre } = req.body;
  try {
    const newBuku = await Buku.create({ judul, category, genre });
    res.status(201).json(newBuku);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create buku' });
  }
};

exports.updateBuku = async (req, res) => {
  const { id } = req.params;
  const { judul, category, genre } = req.body;
  try {
    const buku = await Buku.findByPk(id);
    if (!buku) {
      res.status(404).json({ error: 'Buku not found' });
    } else {
      await buku.update({ judul, category, genre });
      res.json(buku);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update buku' });
  }
};

exports.deleteBuku = async (req, res) => {
  const { id } = req.params;
  try {
    const buku = await Buku.findByPk(id);
    if (!buku) {
      res.status(404).json({ error: 'Buku not found' });
    } else {
      await buku.destroy();
      res.json({ message: 'Buku deleted successfully' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete buku' });
  }
};
