const express = require('express');
const { getServices, getAllServices, createService, updateService, deleteService } = require('../controllers/serviceController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/public', getServices);
router.get('/', protect, getAllServices);
router.post('/', protect, createService);
router.put('/:id', protect, updateService);
router.delete('/:id', protect, deleteService);

module.exports = router;