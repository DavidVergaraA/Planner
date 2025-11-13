const { query } = require('../utils/query');

async function listHabits(userId) {
  const sql = `
    SELECT h.*, COALESCE(SUM(l.points_earned), 0) AS totalPoints,
           MAX(l.completed_at) AS lastCompleted
    FROM habits h
    LEFT JOIN habit_logs l ON l.habit_id = h.id
    WHERE h.user_id = ?
    GROUP BY h.id
    ORDER BY h.priority DESC, h.title ASC
  `;
  return query(sql, [userId]);
}

async function createHabit(userId, { title, description, cadence, priority, rewardPoints }) {
  const result = await query(
    `INSERT INTO habits (user_id, title, description, cadence, priority, reward_points)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [userId, title, description, cadence, priority, rewardPoints]
  );
  return { id: result.insertId, title, description, cadence, priority, rewardPoints };
}

async function logHabitCompletion(habitId, pointsEarned) {
  return query(
    `INSERT INTO habit_logs (habit_id, points_earned, completed_at)
     VALUES (?, ?, NOW())`,
    [habitId, pointsEarned]
  );
}

module.exports = {
  listHabits,
  createHabit,
  logHabitCompletion,
};
