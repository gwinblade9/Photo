const express = require('express');
const { getPhotos, createPhoto, deletePhoto } = require('../controllers/photoController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const router = express.Router();

router.get('/', getPhotos);
router.post('/', protect, upload.single('image'), createPhoto);
router.delete('/:id', protect, deletePhoto);

module.exports = router;