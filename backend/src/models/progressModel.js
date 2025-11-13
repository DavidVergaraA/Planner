const { query } = require('../utils/query');

async function getProgressSummary(userId) {
  const [summary] = await query(
    `SELECT 
        COALESCE(SUM(h.reward_points), 0) AS potentialPoints,
        COALESCE(SUM(l.points_earned), 0) AS earnedPoints,
        COUNT(DISTINCT h.id) AS totalHabits,
        COUNT(DISTINCT CASE WHEN DATE(l.completed_at) = CURDATE() THEN l.id END) AS completionsToday
      FROM habits h
      LEFT JOIN habit_logs l ON l.habit_id = h.id
      WHERE h.user_id = ?`,
    [userId]
  );

  const level = Math.floor((summary.earnedPoints || 0) / 100) + 1;
  const progressToNextLevel = (summary.earnedPoints || 0) % 100;

  return {
    ...summary,
    level,
    progressToNextLevel,
  };
}

async function listBadges(userId) {
  return query(
    `SELECT b.*, ub.unlocked_at
     FROM badges b
     LEFT JOIN user_badges ub ON ub.badge_id = b.id AND ub.user_id = ?
     ORDER BY b.tier ASC, b.title ASC`,
    [userId]
  );
}

async function unlockBadge(userId, badgeId) {
  return query(
    `INSERT IGNORE INTO user_badges (user_id, badge_id, unlocked_at) VALUES (?, ?, NOW())`,
    [userId, badgeId]
  );
}

async function getPet(userId) {
  const pets = await query(`SELECT * FROM pets WHERE user_id = ?`, [userId]);
  return pets[0] || null;
}

async function updatePetExperience(userId, experienceGained) {
  const sql = `
    INSERT INTO pets (user_id, name, level, experience)
    VALUES (?, 'Lumi', 1, ?)
    ON DUPLICATE KEY UPDATE
      experience = experience + VALUES(experience),
      level = 1 + FLOOR((experience + VALUES(experience)) / 250)
  `;
  return query(sql, [userId, experienceGained]);
}

module.exports = {
  getProgressSummary,
  listBadges,
  unlockBadge,
  getPet,
  updatePetExperience,
};
