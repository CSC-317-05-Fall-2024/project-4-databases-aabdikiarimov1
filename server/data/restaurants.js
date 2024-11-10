import { pool } from '../config/database.js';

// Get all restaurants from the database
export async function getRestaurants() {
  try {
    const result = await pool.query('SELECT * FROM restaurants'); // Query to fetch all restaurants
    return result.rows;  // Return the rows 
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    throw error;
  }
}

// Get a single restaurant by id from the database
export async function getRestaurant(id) {
  try {
    const result = await pool.query('SELECT * FROM restaurants WHERE id = $1', [id]);  // Parameterized query to prevent SQL injection
    return result.rows[0];  // Return the first restaurant
  } catch (error) {
    console.error('Error fetching restaurant by ID:', error);
    throw error;
  }
}

// Create a new restaurant entry in the database
export async function createRestaurant(newRestaurant) {
  const { name, phone, adress, photo } = newRestaurant;
  try {
    const result = await pool.query(
      'INSERT INTO restaurants (name, phone, adress, photo) VALUES ($1, $2, $3, $4) RETURNING *', 
      [name, phone, adress, photo]
    );  // Insert new restaurant data and return the created restaurant
    return result.rows[0];  // Return the newly created restaurant
  } catch (error) {
    console.error('Error creating restaurant:', error);
    throw error;
  }
}

// Delete a restaurant by id from the database
export async function deleteRestaurant(id) {
  try {
    const result = await pool.query('DELETE FROM restaurants WHERE id = $1 RETURNING *', [id]);  // Delete query and return deleted restaurant
    if (result.rows.length > 0) {
      return true;  // Deletion successful
    }
    return false;  // No restaurant was found with the given id
  } catch (error) {
    console.error('Error deleting restaurant:', error);
    throw error;
  }
}

// Get all reviews for a specific restaurant by restaurant_id
export async function getReviewsForRestaurant(restaurantId) {
  try {
    // SQL query to get all reviews associated with a specific restaurant
    const result = await pool.query('SELECT * FROM reviews WHERE restaurant_id = $1', [restaurantId]);
    return result.rows;  // Return the reviews associated with the restaurant
  } catch (error) {
    console.error('Error fetching reviews for restaurant:', error);
    throw error;
  }
}
