require('dotenv').config();
const { Pool } = require('pg');

async function test() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    console.log('Tentando conectar ao banco...');
    const res = await pool.query('SELECT NOW() as now');
    console.log('Conexão OK:', res.rows[0]);
  } catch (err) {
    console.error('Erro na conexão:', err.message);
    if (err.stack) console.error(err.stack);
  } finally {
    await pool.end();
  }
}

test();
