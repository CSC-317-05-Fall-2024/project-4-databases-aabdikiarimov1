import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getRestaurants, getRestaurant, createRestaurant, deleteRestaurant } from './data/restaurants.js';  // Import the updated DB methods
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import apiRouter from './routes/api.js';

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use('/api', apiRouter);

app.get('/styles.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'styles.css'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/attractions', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'attractions.html'));
});

app.get('/newform', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'newform.html'));
});

// Render restaurant list
app.get('/restaurants', async (req, res) => {
    try {
        const restaurantData = await getRestaurants();  // Fetch from database
        res.render('restaurants', { restaurantData });
    } catch (error) {
        res.status(500).send('Error fetching restaurant list');
    }
});

// Get restaurant by ID
app.get('/restaurants/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const restaurant = await getRestaurant(id);  // Fetch restaurant by ID from the database
        if (restaurant) {
            res.render('restaurant-details', {
                name: restaurant.name,
                adress: restaurant.adress,  
                phone: restaurant.phone,
                photo: restaurant.photo  
            });
        } else {
            res.status(404).send("Restaurant not found");
        }
    } catch (error) {
        res.status(500).send("Error fetching restaurant by ID");
    }
});

// Add a new restaurant
app.post('/restaurants', async (req, res) => {
    const { name, phone, adress, photo } = req.body;
    const newRestaurant = {
        name,
        phone,
        adress,
        photo
    };
    try {
        const createdRestaurant = await createRestaurant(newRestaurant); // Save to database
        res.redirect('/restaurants');  // Redirect to restaurant list after creation
    } catch (error) {
        res.status(500).send("Error creating restaurant");
    }
});

// Delete a restaurant by ID
app.delete('/restaurants/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const success = await deleteRestaurant(id);  // Delete from database
        if (success) {
            res.sendStatus(204);  // Send success status
        } else {
            res.status(404).send("Restaurant not found.");
        }
    } catch (error) {
        res.status(500).send("Error deleting restaurant");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
