// Listeners.js
import { validateDate, validateTickets, validateAge } from './ValidationUtils.js';
import { displayModalContent } from './ModalContent.js';
import { calculateCost } from './BookingCostCalculator.js';

export function initializeListeners() {
	// A listener to validate the date when the user changes it
	document.getElementById('app_date-input').addEventListener('change', () => {
		console.log('Validando al cambiar la fecha');
		let selectedDate = new Date(document.getElementById('app_date-input').value + 'T00:00:00');

		let isValid = validateDate(selectedDate);

		if (!isValid) {
			// Changing the border color to red and showing the error message as a paragraph
			document.getElementById('app_date-input').style.borderColor = 'red';
			document.getElementById('app_date-error').innerHTML = 'The date must be greater than today';
		} else {
			// Changing the border color to green
			document.getElementById('app_date-input').style.borderColor = 'grey';
			document.getElementById('app_date-error').innerHTML = '';
		}
	});

	// A listener to validate the number of tickets when the user changes it
	document.getElementById('app_tickets-input').addEventListener('change', () => {
		let selectedTickets = document.getElementById('app_tickets-input').value;

		let isValid = validateTickets(selectedTickets);

		if (!isValid) {
			// Changing the border color to red and showing the error message as a paragraph
			document.getElementById('app_tickets-input').style.borderColor = 'red';
			document.getElementById('app_tickets-error').innerHTML =
				'The number of tickets must be greater than 0 and less than 10';
		} else {
			// Changing the border color to green
			document.getElementById('app_tickets-input').style.borderColor = 'grey';
			document.getElementById('app_tickets-error').innerHTML = '';
		}
	});

	// A listener to validate the age of the user when the user changes it
	document.querySelector('#app_age-input').addEventListener('change', () => {
		let selectedAge = document.getElementById('app_age-input').value;

		let isValid = validateAge(selectedAge);

		if (!isValid) {
			// Changing the border color to red and showing the error message as a paragraph
			document.getElementById('app_age-input').style.borderColor = 'red';
			document.getElementById('app_age-error').innerHTML = 'You must be 20 years old or older to buy tickets';
		} else {
			// Changing the border color to grey
			document.getElementById('app_age-input').style.borderColor = 'grey';
			document.getElementById('app_age-error').innerHTML = '';
		}
	});

	// A listener to calculate the cost of the tickets
	document.querySelectorAll('.container__form--input').forEach((input) => {
		input.addEventListener('change', () => {
			if (
				validateDate(new Date(document.getElementById('app_date-input').value + 'T00:00:00')) &&
				validateTickets(document.getElementById('app_tickets-input').value) &&
				validateAge(document.getElementById('app_age-input').value)
			) {
				calculateCost();
				console.log('change');
			} else {
				let resultsContainer = document.getElementById('app_results-container');
				resultsContainer.style.display = 'block';
				resultsContainer.style.color = 'red';
				resultsContainer.style.border = '1px solid red';
				resultsContainer.innerHTML = 'Please fill the form correctly';
			}
		});
	});

	// A listener for the form submission
	document.querySelector('form').addEventListener('submit', (event) => {
		event.preventDefault();
		handleFormSubmission();
	});
}

function handleFormSubmission() {
	const formData = {
		city: document.getElementById('app_cities-select').value,
		movie: document.getElementById('app_movies-select').value,
		date: document.getElementById('app_date-input').value,
		tickets: document.getElementById('app_tickets-input').value,
		showtime: document.querySelector('input[name="showtimes"]:checked').value,
		firstname: capitalizeFirstLetter(document.getElementById('app_firstname-input').value),
		lastname: capitalizeFirstLetter(document.getElementById('app_lastname-input').value),
		email: document.getElementById('app_email-input').value.toLowerCase(),
		gender: document.querySelector('input[name="gender"]:checked').value,
		age: document.getElementById('app_age-input').value,
		cinema: document.querySelector('input[name="cinema"]:checked').value,
		total: document.getElementById('total').innerHTML,
	};

	saveFormDataToLocalstorage(formData);
	calculateCost(formData);
	displayModalContent(formData);
	showModal();
}

function saveFormDataToLocalstorage(formData) {
	localStorage.setItem('formData', JSON.stringify(formData));
}

function showModal() {
	const modal = document.getElementById('modal');
	modal.showModal();
}

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
