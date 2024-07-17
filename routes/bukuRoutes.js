const express = require('express');
const router = express.Router();
const bukuController = require('../controllers/bukuController');
const authenticate = require('../middleware/authenticate');
const checkRole = require('../middleware/checkRole');

router.get('/', authenticate,bukuController.getAllBuku);
router.get('/:id', authenticate,bukuController.getBukuById);
router.post('/',authenticate, checkRole('pustakawan'), bukuController.createBuku);
router.put('/:id',authenticate, checkRole('pustakawan'), bukuController.updateBuku);
router.delete('/:id', authenticate, checkRole('pustakawan'),bukuController.deleteBuku);

module.exports = router;
