// routes/auth.js
const express = require('express');
const { registerPustakawan, registerAnggota, login } = require('../controllers/authController');
const router = express.Router();

router.post('/admin', registerPustakawan);
router.post('/register', registerAnggota);
router.post('/login', login);

module.exports = router;
