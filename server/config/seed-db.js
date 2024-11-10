import { pool } from '../config/database.js';  

// Function to drop tables
async function dropTables() {
  try {
    // Drop reviews table first to avoid foreign key constraints
    await pool.query(`DROP TABLE IF EXISTS reviews;`);
    await pool.query(`DROP TABLE IF EXISTS restaurants;`);
    console.log('Dropped reviews and restaurants tables');
  } catch (error) {
    console.error('Error dropping tables:', error);
  }
}

// Function to create tables
async function createTables() {
  try {
    // Create restaurants table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS restaurants (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        adress VARCHAR(255) NOT NULL,
        photo VARCHAR(255)
      );
    `);
    console.log('Created restaurants table');

    // Create reviews table with a key reference to restaurants
    await pool.query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id SERIAL PRIMARY KEY,
        rating INTEGER NOT NULL,
        content TEXT NOT NULL,
        restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE
      );
    `);
    console.log('Created reviews table');
  } catch (error) {
    console.error('Error creating tables:', error);
  }
}

// Function to insert initial data
async function insertData() {
  try {
    // Insert data into restaurants table
    await pool.query(`
      INSERT INTO restaurants (name, phone, adress, photo)
      VALUES
          ('Lazy Bear', '(415) 123 - 4567', '3416 19th St, San Francisco, CA 94110', 'images/restaurant1.jpg'),
          ('Hog Island Oyster', '(415) 123 - 4567', '1 Ferry Bldg, Ste 11, San Francisco, CA 94111', 'images/restaurant2.jpg'),
          ('Gary Danko', '(415) 123 - 4567', '800 North Point st, San Francisco, CA 94109', 'images/restaurant3.jpg'),
          ('Brenda''s French Soul Food', '(415) 123 - 4567', '652 Polk St, San Francisco, CA 94102', 'images/restaurant4.jpg'),
          ('Kokkari Estiatorio', '(415) 123 - 4567', '200 Jackson St, San Francisco, CA 94111', 'images/restaurant5.jpg'),
          ('San Tung', '(415) 123 - 4567', '1031 Irving St, San Francisco, CA 94122', 'images/restaurant6.jpg'),
          ('Sons & Daughters', '(415) 994-7933', 'Between Mason &, 708 Bush Street, Powell St, San Francisco, CA 94108', 'https://lh3.googleusercontent.com/p/AF1QipNRYiS7YxotMX2h8WD4H6CUtoWsugV6xqILjtKQ=s1360-w1360-h1020');
    `);
    console.log('Inserted initial data into restaurants table');

    // Insert data into reviews table
    // 2 reviews for the first restaurant (Lazy Bear)
    await pool.query(`
      INSERT INTO reviews (rating, content, restaurant_id)
      VALUES
          (5, 'Amazing food and great ambiance!', 1),
          (4, 'Delicious, but a bit on the expensive side.', 1);
    `);

    // 2 reviews for the second restaurant (Hog Island Oyster)
    await pool.query(`
      INSERT INTO reviews (rating, content, restaurant_id)
      VALUES
          (4, 'Great oysters, but the service was a little slow.', 2),
          (5, 'An unforgettable experience. Highly recommend!', 2);
    `);

    console.log('Inserted initial data into reviews table');
  } catch (error) {
    console.error('Error inserting data:', error);
  }
}

// Main function to seed the database
async function seedDatabase() {
  await dropTables();
  await createTables();
  await insertData();
  pool.end(); // Close the database connection after seeding
}

// Run the seed function
seedDatabase();
