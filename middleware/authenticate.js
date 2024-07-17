const jwt = require('jsonwebtoken');
const Pustakawan = require('../models/pustakawan');
const Anggota = require('../models/anggota');
require('dotenv').config();

const authenticate = async (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ error: 'Access Denied' });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    console.log(`Token received: ${token}`);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(`Decoded token: ${JSON.stringify(decoded)}`);
    
    let user;

    if (decoded.role === 'pustakawan') {
      user = await Pustakawan.findOne({ where: { ID_pustakawan: decoded.id } });
    } else if (decoded.role === 'anggota') {
      user = await Anggota.findOne({ where: { ID_anggota: decoded.id } });
    }

    if (!user) {
      console.log('User not found');
      throw new Error('User not found');
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(`Error verifying token: ${error.message}`);
    res.status(401).json({ error: 'Invalid Token' });
  }
};

module.exports = authenticate;
