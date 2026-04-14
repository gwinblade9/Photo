const db = require('../config/database');

const sendMessage = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    await db.run(
      'INSERT INTO messages (name, email, phone, message) VALUES (?, ?, ?, ?)',
      [name, email, phone, message]
    );
    res.status(201).json({ message: 'Сообщение отправлено' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMessages = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM messages ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    await db.run('UPDATE messages SET is_read = 1 WHERE id = ?', [id]);
    res.json({ message: 'Отмечено прочитанным' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    await db.run('DELETE FROM messages WHERE id = ?', [id]);
    res.json({ message: 'Удалено' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { sendMessage, getMessages, markAsRead, deleteMessage };