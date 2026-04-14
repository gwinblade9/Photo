const db = require('../config/database');

const getPosts = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM blog_posts WHERE published = 1 ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPostBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const post = await db.get('SELECT * FROM blog_posts WHERE slug = ?', [slug]);
    if (!post) return res.status(404).json({ message: 'Не найдено' });
    await db.run('UPDATE blog_posts SET views = views + 1 WHERE id = ?', [post.id]);
    const comments = await db.query('SELECT * FROM comments WHERE post_id = ? ORDER BY created_at DESC', [post.id]);
    res.json({ ...post, comments: comments.rows });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, slug, excerpt, content, featured_image, published } = req.body;
    const result = await db.run(
      'INSERT INTO blog_posts (title, slug, excerpt, content, featured_image, published) VALUES (?, ?, ?, ?, ?, ?)',
      [title, slug, excerpt, content, featured_image, published ? 1 : 0]
    );
    res.status(201).json({ id: result.lastID });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, slug, excerpt, content, featured_image, published } = req.body;
    await db.run(
      'UPDATE blog_posts SET title=?, slug=?, excerpt=?, content=?, featured_image=?, published=? WHERE id=?',
      [title, slug, excerpt, content, featured_image, published ? 1 : 0, id]
    );
    res.json({ message: 'Обновлено' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await db.run('DELETE FROM blog_posts WHERE id = ?', [id]);
    res.json({ message: 'Удалено' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { author_name, content } = req.body;
    const result = await db.run(
      'INSERT INTO comments (post_id, author_name, content) VALUES (?, ?, ?)',
      [postId, author_name, content]
    );
    res.status(201).json({ id: result.lastID });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getPosts, getPostBySlug, createPost, updatePost, deletePost, addComment };