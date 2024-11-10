const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const formData = new FormData(event.target); // Get the form data
    const newRestaurant = {
        name: formData.get('name'), // Get the name from the form input
        phone: formData.get('phone'), // Get the phone number from the form input
        adress: formData.get('adress'), // Get the address from the form input
        photo: formData.get('photo') || "images/default-restaurant.jpg" // Get the image URL or set a default
    };

    try {
        // Make a POST request to create a new restaurant
        const response = await fetch('/api/restaurants', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newRestaurant) // Send the new restaurant data
        });

        if (response.ok) {
            // If the response is OK, redirect to the restaurants page
            window.location.href = '/restaurants';  
        } else {
            console.error("Failed to create restaurant:", await response.json());
        }
    } catch (error) {
        console.error("Error:", error);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#restaurant-form'); 
    if (form) {
        form.addEventListener('submit', handleSubmit); 
    }
});
