const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config({ path: process.env.DOTENV_CONFIG_PATH || undefined });

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  user: process.env.DB_USER || 'planner_user',
  password: process.env.DB_PASSWORD || 'planner_password',
  database: process.env.DB_NAME || 'planner_db',
  connectionLimit: 10,
});

module.exports = pool;
