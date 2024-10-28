const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function execute_procedure(procedureName, inputs=[]) {
  try {
    const connection = await pool.getConnection();
    const placeholders = inputs.map(() => '?').join(', ');
    const query = `CALL ${procedureName}(${placeholders})`;

    const [results] = await connection.query(query, inputs);
    
    connection.release();
    return results;
  } catch (error) {
    console.error('Error executing procedure:', error);
    throw error;
  }
}

module.exports = {
  execute_procedure,
};
