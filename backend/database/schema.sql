CREATE DATABASE IF NOT EXISTS planner_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE planner_db;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  avatar VARCHAR(50) DEFAULT 'warrior',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS habits (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(120) NOT NULL,
  description TEXT,
  cadence ENUM('daily', 'weekly', 'custom') DEFAULT 'daily',
  priority TINYINT DEFAULT 3,
  reward_points INT DEFAULT 20,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS habit_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  habit_id INT NOT NULL,
  points_earned INT DEFAULT 10,
  completed_at DATETIME NOT NULL,
  FOREIGN KEY (habit_id) REFERENCES habits(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS badges (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(120) NOT NULL,
  description VARCHAR(255) NOT NULL,
  tier ENUM('bronze', 'silver', 'gold', 'platinum') DEFAULT 'bronze',
  requirement_points INT DEFAULT 100
);

CREATE TABLE IF NOT EXISTS user_badges (
  user_id INT NOT NULL,
  badge_id INT NOT NULL,
  unlocked_at DATETIME NOT NULL,
  PRIMARY KEY (user_id, badge_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (badge_id) REFERENCES badges(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS pets (
  user_id INT PRIMARY KEY,
  name VARCHAR(60) NOT NULL DEFAULT 'Lumi',
  level INT DEFAULT 1,
  experience INT DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO badges (title, description, tier, requirement_points) VALUES
  ('Explorador Novato', 'Completa tu primer hábito', 'bronze', 20),
  ('Ritualista', 'Cumple 7 hábitos en una semana', 'silver', 150),
  ('Maestro del Ritmo', 'Alcanza 500 puntos', 'gold', 500)
ON DUPLICATE KEY UPDATE title = VALUES(title);
