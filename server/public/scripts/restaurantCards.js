document.addEventListener('DOMContentLoaded', () => {
    renderRestaurants();
});

// Fetch and render all restaurants
async function renderRestaurants() {
    const response = await fetch('/api/restaurants');
    const restaurants = await response.json();

    const container = document.getElementById('restaurant-container'); 
    container.innerHTML = ''; // Clear the container before rendering

    restaurants.forEach(restaurant => {
        const card = createRestaurantCard(restaurant);
        container.appendChild(card);
    });


    addRestaurantLinkListeners();
}

// Create a restaurant card element
function createRestaurantCard(restaurant) {
    const card = document.createElement('div');
    card.className = 'restaurant';
    card.id = `restaurant-${restaurant.id}`;
    card.setAttribute('data-id', restaurant.id); 

    card.innerHTML = `
        <img src="${restaurant.photo}" alt="${restaurant.name}">
        <h2>
            <a href="#" class="restaurant-link" data-id="${restaurant.id}">${restaurant.name}</a>
        </h2>
        <p>${restaurant.adress}</p>
        <p>${restaurant.phone}</p>
        <button class="delete-btn" data-id="${restaurant.id}">Delete</button>
    `;

    // Attach delete button event listener
    const deleteButton = card.querySelector('.delete-btn');
    deleteButton.addEventListener('click', deleteRestaurantCard); 
    return card;
}

// Function to add event listeners to restaurant links
function addRestaurantLinkListeners() {
    const restaurantLinks = document.querySelectorAll('.restaurant-link');
    restaurantLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            const restaurantId = event.target.getAttribute('data-id'); // Get the restaurant ID from data attribute
            openRestaurantDetails(restaurantId); // Call function to open restaurant details
        });
    });
}

// Function to open restaurant details by ID
function openRestaurantDetails(id) {
    window.location.href = `/restaurants/${id}`; // Redirect to restaurant details page
}

// Delete a restaurant card
async function deleteRestaurantCard(event) {
    const button = event.target;
    const restaurantId = button.getAttribute('data-id'); // Get the restaurant ID
    const card = document.getElementById(`restaurant-${restaurantId}`);
    
    try {
        const response = await fetch(`/api/restaurants/${restaurantId}`, { method: 'DELETE' });
        if (response.ok) {
            card.remove();  // Remove card from the DOM if delete is successful
        } else {
            console.error("Failed to delete restaurant:", await response.json());
        }
    } catch (error) {
        console.error("Error:", error);
    }
}
