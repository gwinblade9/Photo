const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await db.get('SELECT * FROM admins WHERE email = ?', [email]);
    
    if (!admin) {
      return res.status(401).json({ message: 'Неверный email или пароль' });
    }
    
    const isValid = await bcrypt.compare(password, admin.password_hash);
    if (!isValid) {
      return res.status(401).json({ message: 'Неверный email или пароль' });
    }
    
    const token = jwt.sign({ id: admin.id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.json({ token, admin: { id: admin.id, email: admin.email } });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

const createDefaultAdmin = async () => {
  const existing = await db.get('SELECT * FROM admins WHERE email = ?', [process.env.ADMIN_EMAIL]);
  if (!existing) {
    const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    await db.run('INSERT INTO admins (email, password_hash) VALUES (?, ?)', [process.env.ADMIN_EMAIL, hash]);
    console.log('✅ Админ создан:', process.env.ADMIN_EMAIL, '/', process.env.ADMIN_PASSWORD);
  }
};

module.exports = { login, createDefaultAdmin };