const { query } = require('../utils/query');

async function createUser({ name, email, avatar }) {
  const result = await query(
    `INSERT INTO users (name, email, avatar) VALUES (?, ?, ?)`,
    [name, email, avatar]
  );
  return { id: result.insertId, name, email, avatar };
}

async function getUserById(id) {
  const users = await query(`SELECT * FROM users WHERE id = ?`, [id]);
  return users[0] || null;
}

async function getOrCreateDefaultUser() {
  const [user] = await query(`SELECT * FROM users ORDER BY id ASC LIMIT 1`);
  if (user) return user;
  return createUser({
    name: 'Aventurero',
    email: 'aventurero@example.com',
    avatar: 'warrior',
  });
}

module.exports = {
  createUser,
  getUserById,
  getOrCreateDefaultUser,
};
