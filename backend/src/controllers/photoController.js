const db = require('../config/database');
const fs = require('fs');
const path = require('path');

const getPhotos = async (req, res) => {
  try {
    const { category, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;
    let sql = 'SELECT * FROM photos';
    let params = [];
    
    if (category && category !== 'all') {
      sql += ' WHERE category = ?';
      params.push(category);
    }
    
    sql += ' ORDER BY uploaded_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));
    
    const result = await db.query(sql, params);
    res.json({ photos: result.rows, total: result.rows.length, page: parseInt(page) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPhoto = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const filename = req.file.filename;
    
    // Копируем как миниатюру (упрощённо)
    const thumbPath = path.join(__dirname, '../../uploads/thumbnails', filename);
    fs.copyFileSync(req.file.path, thumbPath);
    
    const result = await db.run(
      'INSERT INTO photos (title, description, category, filename, thumbnail_filename) VALUES (?, ?, ?, ?, ?)',
      [title, description, category, filename, filename]
    );
    res.status(201).json({ id: result.lastID, message: 'Фото добавлено' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const photo = await db.get('SELECT filename FROM photos WHERE id = ?', [id]);
    if (photo) {
      const files = [
        path.join(__dirname, '../../uploads/photos', photo.filename),
        path.join(__dirname, '../../uploads/thumbnails', photo.filename)
      ];
      files.forEach(f => { if (fs.existsSync(f)) fs.unlinkSync(f); });
    }
    await db.run('DELETE FROM photos WHERE id = ?', [id]);
    res.json({ message: 'Фото удалено' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getPhotos, createPhoto, deletePhoto };