const dotenv = require('dotenv');
const app = require('./app');
const pool = require('./config/database');

dotenv.config({ path: process.env.DOTENV_CONFIG_PATH || undefined });

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await pool.query('SELECT 1');
    app.listen(PORT, () => {
      console.log(`Planner backend listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Database connection failed', error);
    process.exit(1);
  }
}

start();
