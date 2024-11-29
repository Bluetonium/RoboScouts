import "dotenv/config";
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: process.env.ROOT_PASSWORD,
  database: 'roboscouts',
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0
  });

export default pool;