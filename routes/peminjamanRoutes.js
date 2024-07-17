// routes/peminjamanRoutes.js
const express = require('express');
const router = express.Router();
const peminjamanController = require('../controllers/peminjamanController');
const authenticate = require('../middleware/authenticate');
const checkRole = require('../middleware/checkRole');

router.get('/', authenticate, peminjamanController.getAllPeminjaman);
router.get('/:id', authenticate, peminjamanController.getPeminjamanById);
router.post('/', authenticate, checkRole('pustakawan'), peminjamanController.createPeminjaman);
router.put('/:id', authenticate, checkRole('pustakawan'), peminjamanController.updatePeminjaman);
router.delete('/:id', authenticate, checkRole('pustakawan'), peminjamanController.deletePeminjaman);



module.exports = router;
