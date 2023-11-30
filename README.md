# Movie Booking System

## Overview
Welcome to the Movie Booking System repository! This project is designed to facilitate the booking of movie tickets by providing users with an intuitive web interface. It incorporates features for selecting cities, movies, cinemas, and showtimes, as well as calculating the cost of tickets based on user input.

## Features

### 1. User-Friendly Interface
The system boasts a user-friendly interface that allows users to easily navigate through the booking process. Clear labels, dropdowns, and radio buttons guide users in selecting their preferences.

### 2. Dynamic City and Cinema Selection
The system dynamically loads city and cinema options from a JSON file, providing an up-to-date and flexible list of choices for users.

```javascript
Copy code
// JSONLoader.js

function loadJSON() {
    // ... (fetch and load JSON logic)
}
```

### 3. Real-time Cost Calculation
The calculateCost function dynamically calculates the cost of movie tickets based on user input and displays the results in real-time.

```javascript
Copy code
// BookingCalculator.js

function calculateCost() {
    // ... (cost calculation logic)
}
```

### 4. Form Validation
The system validates user inputs such as date, number of tickets, and age to ensure accurate and reliable data.

```javascript
Copy code
// FormValidation.js

function validateDate(selectedDate, currentDate = new Date()) {
    // ... (date validation logic)
}
```

### 5. Modal Feedback
Upon successful booking, users receive feedback through a modal window displaying their booking details.

```javascript
Copy code
// Main.js

document.querySelector('form').addEventListener('submit', (event) => {
    // ... (modal content creation and display logic)
});
```
### 6. Responsive Design
The web application incorporates responsive design, ensuring a seamless experience across various devices.

### 7. Persistent Data Storage
User data is stored locally using the localStorage API, allowing users to retrieve their previous booking information.

```javascript
Copy code
// Main.js

const formData = {
    // ... (user data)
};
localStorage.setItem('formData', JSON.stringify(formData));
```

## Getting Started
To run the Movie Booking System locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/your-username/movie-booking-system.git
```
2. Open the index.html file in your web browser.

3. Explore and enjoy the seamless movie booking experience!

## Contributing
We welcome contributions from the community. If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.
