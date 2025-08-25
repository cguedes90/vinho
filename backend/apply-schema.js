require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

async function apply() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
  try {
    const sql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    console.log('Executando schema.sql...');
    await pool.query(sql);
    console.log('Schema aplicado com sucesso');
  } catch (err) {
    console.error('Erro aplicando schema:', err.message);
    console.error(err.stack);
  } finally {
    await pool.end();
  }
}

apply();
