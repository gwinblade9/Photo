const express = require('express');
const { getPosts, getPostBySlug, createPost, updatePost, deletePost, addComment } = require('../controllers/blogController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getPosts);
router.get('/:slug', getPostBySlug);
router.post('/', protect, createPost);
router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);
router.post('/:postId/comments', addComment);

module.exports = router;