const db = require('../config/database');

const getServices = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM services WHERE is_active = 1');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllServices = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM services');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createService = async (req, res) => {
  try {
    const { name, price, description, features, is_active } = req.body;
    const result = await db.run(
      'INSERT INTO services (name, price, description, features, is_active) VALUES (?, ?, ?, ?, ?)',
      [name, price, description, features || '', is_active ? 1 : 0]
    );
    res.status(201).json({ id: result.lastID });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, features, is_active } = req.body;
    await db.run(
      'UPDATE services SET name=?, price=?, description=?, features=?, is_active=? WHERE id=?',
      [name, price, description, features || '', is_active ? 1 : 0, id]
    );
    res.json({ message: 'Обновлено' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    await db.run('DELETE FROM services WHERE id = ?', [id]);
    res.json({ message: 'Удалено' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getServices, getAllServices, createService, updateService, deleteService };