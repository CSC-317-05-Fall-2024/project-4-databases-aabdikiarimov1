import express from 'express';
import { createRestaurant, deleteRestaurant, getRestaurants, getRestaurant } from '../data/restaurants.js';

const router = express.Router();

// Create a new restaurant
router.post('/restaurants', async (req, res) => {  
    const newRestaurant = {
        name: req.body.name,
        phone: req.body.phone,
        adress: req.body.adress,
        photo: req.body.photo || "images/default-restaurant.jpg"
    };
    
    try {
        const createdRestaurant = await createRestaurant(newRestaurant);  // Await the database call
        res.status(201).json(createdRestaurant);
    } catch (error) {
        console.error('Error creating restaurant:', error);
        res.status(500).json({ message: 'Error creating restaurant' });
    }
});

// Delete a restaurant by ID
router.delete('/restaurants/:id', async (req, res) => { 
    const id = parseInt(req.params.id, 10);
    try {
        const deleted = await deleteRestaurant(id);  // Await the database call
        if (deleted) {
            res.status(204).send(); 
        } else {
            res.status(404).json({ message: "Restaurant not found." });
        }
    } catch (error) {
        console.error('Error deleting restaurant:', error);
        res.status(500).json({ message: 'Error deleting restaurant' });
    }
});

// Get all restaurants
router.get('/restaurants', async (req, res) => {  
    try {
        const restaurants = await getRestaurants();  // Await the database call
        res.json(restaurants);  // Send back the restaurants data
    } catch (error) {
        console.error('Error fetching restaurants:', error);
        res.status(500).json({ message: 'Error fetching restaurants' });
    }
});

// Get a restaurant by ID
router.get('/restaurants/:id', async (req, res) => {  
    const id = parseInt(req.params.id, 10);
    try {
        const restaurant = await getRestaurant(id);  // Await the database call
        if (restaurant) {
            res.json(restaurant);  // Return the found restaurant
        } else {
            res.status(404).json({ message: "Restaurant not found." });
        }
    } catch (error) {
        console.error('Error fetching restaurant:', error);
        res.status(500).json({ message: 'Error fetching restaurant' });
    }
});

export default router;
