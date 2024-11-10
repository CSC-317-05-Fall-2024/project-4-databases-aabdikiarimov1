import pg from 'pg';  
const { Pool } = pg;  

import dotenv from 'dotenv';


dotenv.config();

// Create a new Pool instance using the CONNECTION_STRING environment variable
const pool = new Pool({
  connectionString: process.env.CONNECTION_STRING,
});


pool.on('connect', () => {
  console.log('Connected to the database');
});

// Export the pool object and the query function
export { pool };
