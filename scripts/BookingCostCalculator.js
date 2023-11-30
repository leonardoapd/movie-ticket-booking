import MovieTicket from './MovieTicket.js';
// Once the data in the form is complete and valid, the cost of the tickets is calculated
function calculateCost() {
	// let selectedDate = new Date(document.getElementById('app_date-input').value);
	let selectedTickets = document.getElementById('app_tickets-input').value;

	// Using the Movie class to create a new ticket
	let ticket = new MovieTicket(selectedTickets);
	let [price, subtotal, taxes, total] = ticket.calculateCost();

	// Show the cost of the tickets
	let resultsContainer = document.getElementById('app_results-container');
	resultsContainer.style.display = 'block';
	resultsContainer.innerHTML = '';
	resultsContainer.style.color = 'black';
	resultsContainer.style.border = '1px solid gray';

	let priceParagraph = document.createElement('p');
	priceParagraph.innerHTML = `Ticket Price: $${price}/ticket`;

	let subtotalParagraph = document.createElement('p');
	subtotalParagraph.innerHTML = `Subtotal: <span id="subtotal">$${subtotal}</span>`;

	let taxesParagraph = document.createElement('p');
	taxesParagraph.innerHTML = `Taxes: <span id="taxes">$${taxes.toFixed(2)}</span>`;

	let totalParagraph = document.createElement('p');
	totalParagraph.innerHTML = `Total: <span id="total">$${total}</span>`;

	resultsContainer.appendChild(priceParagraph);
	resultsContainer.appendChild(subtotalParagraph);
	resultsContainer.appendChild(taxesParagraph);
	resultsContainer.appendChild(totalParagraph);
}

export { calculateCost };
