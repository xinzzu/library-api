const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Pustakawan = require('../models/pustakawan');
const Anggota = require('../models/anggota');
require('dotenv').config();

const registerPustakawan = async (req, res) => {
  const { username, nama, password, role } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const pustakawan = await Pustakawan.create({
      username,
      nama,
      password: hashedPassword,
      role,
    });

    res.status(201).json({ message: 'Pustakawan registered successfully!', user: pustakawan });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const registerAnggota = async (req, res) => {
  const { username, password, nama, tgllahir, denda, role } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const anggota = await Anggota.create({
      username,
      password: hashedPassword,
      nama,
      tgllahir,
      denda,
      role,
    });

    res.status(201).json({ message: 'Anggota registered successfully!', user: anggota });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { username, password, role } = req.body;
  let user;

  console.log(`Login attempt: username=${username}, role=${role}`);

  try {
    if (role === 'pustakawan') {
      user = await Pustakawan.findOne({ where: { username } });
      console.log(`Pustakawan found: ${user}`);
    } else if (role === 'anggota') {
      user = await Anggota.findOne({ where: { username } });
      console.log(`Anggota found: ${user}`);
    }

    if (!user) {
      console.log('Username not found');
      return res.status(400).json({ error: 'Username not found' });
    }

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      console.log('Invalid password');
      return res.status(400).json({ error: 'Invalid password' });
    }

    // Use the correct ID field from the model
    const userId = role === 'pustakawan' ? user.ID_pustakawan : user.ID_anggota;

    // Set token expiration to 7 days
    const token = jwt.sign({ id: userId, role }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    console.log(`Token generated: ${token}`);
    res.status(200).json({ message: 'Login successful!', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { registerPustakawan, registerAnggota, login };
