// -------------------------------------------------------------------
//                         VALIDATIONS
// -------------------------------------------------------------------

// Function to validate if the date is valid
function validateDate(selectedDate, currentDate = new Date()) {
	let isValid = selectedDate >= currentDate;

	if (isValid) {
		return true;
	} else {
		return false;
	}
}

// Function to validate the number of tickets and the age of the user
function validateTickets(tickets) {
	let isValid = tickets > 0 && tickets < 11;

	if (isValid) {
		return true;
	} else {
		return false;
	}
}

// Function to validate the age of the user
function validateAge(age) {
	let isValid = age >= 20;

	if (isValid) {
		return true;
	} else {
		return false;
	}
}

export { validateDate, validateTickets, validateAge };
