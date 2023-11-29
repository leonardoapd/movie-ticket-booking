/*
* Assignment 1 - SYST24444 JSON and Local Storage
* Author: Leonardo Perdomo D (perdomod)
* Date: 2023-01-29
* Filename: perdomod.js
*/

// ------------------------------------------------------------------
//                          CLASSES
// ------------------------------------------------------------------

class MovieTicket {
    constructor(noOfTickets) {
        this.noOfTickets = noOfTickets;
        this.price = 20;
        this.tax = 0.13;
    }

    calculateCost() {
        let subtotal = this.price * this.noOfTickets;
        let taxes = subtotal * this.tax;
        let total = subtotal + taxes;

        return [this.price, subtotal, taxes, total];
    }
}

// Function to start up the page using onload
function startUp() {
    loadHeaderAndFooter();
    loadJSON();
    loadModalElements();
    changeBGColorRadio()
}

function loadHeaderAndFooter() {
    const pageTitle = `Winter 2023 Assignment #1 for Leonardo A Perdomo from Colombia`;
    document.getElementById("subtitle").innerHTML = pageTitle;

    const footerText = `My Login: PerdomoD - My ID: 991669214 - My Program: Computer Programming - Software Engineering <br>
                            &copy; ${new Date().getFullYear()} Leonardo A Perdomo - All Rights Reserved.`;
    document.getElementById("footer_text").innerHTML = footerText;
}

function loadModalElements() {
    //The elements of the modal are gotten
    const modal = document.getElementById("modal");
    const closeModal = document.getElementById("close-modal");

    //Function to close the modal
    closeModal.onclick = () => {
        modal.close();
        //reload the page
        location.reload();
    }
}



//Function to close the modal when the user clicks outside of it listening to the click event
window.onclick = (event) => {
    if (event.target == modal) {
        modal.close();
    }
}

// Function to load the JSON file
function loadJSON() {
    let citiesJSONPath = "../data/perdomod.json";

    // Fetch the JSON file
    fetch(citiesJSONPath).then((response) => {
        return response.json();
    }).then((json) => {

        const selectCity = document.getElementById('app_cities-select');

        //Changing the classes of the select when the user selects a city
        selectCity.addEventListener('change', () => {
            selectCity.className = 'container__form--input';
        });

        const selectMovie = document.getElementById('app_movies-select');

        // let cinemasContainer = document.getElementById('app_cinemas-container');

        // Loop through the JSON file and create the options for the select
        for (let city in json.Cities) {
            let option = document.createElement('option');
            option.innerHTML = city;
            option.value = city;
            selectCity.appendChild(option);
        }

        // Function to show the cinemas for the selected city
        selectCity.addEventListener('change', () => {
            let selectedCity = selectCity.value;
            let citiesCol = document.getElementById('cities_col');
            let cinemasTitle = document.getElementsByClassName('cinemas_name')[0];
            let cinemasRadiosContainer = document.createElement('div');

            citiesCol.classList.replace('col-12', 'col-6');
            citiesCol.classList.replace('col-s-12', 'col-s-6');

            cinemasTitle.classList.add('col-6');
            cinemasTitle.classList.add('col-s-6');
            cinemasTitle.innerHTML = '';

            if (selectedCity == '') {
                citiesCol.classList.replace('col-6', 'col-12');
                citiesCol.classList.replace('col-s-6', 'col-s-12');
                cinemasTitle.classList.remove('col-6');
                cinemasTitle.classList.remove('col-s-6');
                cinemasTitle.innerHTML = '';
                return;
            }

            let cinemas = json.Cities[selectedCity].Cinemas;

            console.log(cinemas[0]);

            // Create the title
            let title = document.createElement('p');
            title.innerHTML = 'Theatres';
            title.className = 'container__form--label';
            cinemasTitle.appendChild(title);


            // cinemasTitle.innerHTML = '<label class="floating-label" for="cinema">Select a cinema</label>';
            cinemasTitle.appendChild(cinemasRadiosContainer);
            // Clear the container
            cinemasRadiosContainer.innerHTML = '';
            // Adding a class to the container
            cinemasRadiosContainer.className = 'container__form--input';

            // Map the cinemas and create the radio buttons
            cinemas.map((cinema, index) => {
                let radio = document.createElement('input');
                radio.type = 'radio';
                radio.name = 'cinema';
                radio.id = 'cinema' + index;
                radio.value = cinemas[index];
                radio.checked = index == 0 ? true : false;

                let label = document.createElement('label');
                label.htmlFor = 'cinema' + index;
                label.innerHTML = cinemas[index];

                let div = document.createElement('div');
                div.className = 'container__form--radio';

                cinemasRadiosContainer.appendChild(div);
                div.appendChild(radio);
                div.appendChild(label);
            });
        });

        for (let i = 0; i < json.Movies.length; i++) {
            let option = document.createElement('option');
            option.innerHTML = json.Movies[i];
            option.value = json.Movies[i];
            selectMovie.appendChild(option);
        }


    });



}

function changeBGColorRadio() {
    // Changing the background color of the radio buttons when clicked
    let radiobtn = document.getElementsByClassName("radiobtn");
    for (let i = 0; i < radiobtn.length; i++) {
        radiobtn[i].addEventListener("click", function () {
            for (let y = 0; y < radiobtn.length; y++) {
                radiobtn[y].style.backgroundColor = "";
            }
            this.style.backgroundColor = "#00A7E1";
        });
    }
}

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

// -------------------------------------------------------------------
//                         LISTENERS
// -------------------------------------------------------------------

// A listener to validate the date when the user changes it
document.getElementById('app_date-input').addEventListener('change', () => {

    console.log("Validando al cambiar la fecha");
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
        document.getElementById('app_tickets-error').innerHTML = 'The number of tickets must be greater than 0 and less than 10';

    } else {
        // Changing the border color to green
        document.getElementById('app_tickets-input').style.borderColor = 'grey';
        document.getElementById('app_tickets-error').innerHTML = '';
    }
});


// A listener to validate the age of the user using querySelector to select the element when the user changes it
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

// A listener to calculate the cost of the tickets
document.querySelectorAll('.container__form--input').forEach((input) => {
    input.addEventListener('change', () => {

        console.log("Validando al hacer cualquier cambio");
        console.log(validateDate(new Date(document.getElementById('app_date-input').value + 'T00:00:00')));
        console.log(validateTickets(document.getElementById('app_tickets-input').value));
        console.log(validateAge(document.getElementById('app_age-input').value));

        if (validateDate(new Date(document.getElementById('app_date-input').value + 'T00:00:00')) && validateTickets(document.getElementById('app_tickets-input').value) && validateAge(document.getElementById('app_age-input').value)) {
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

// When a radio button is checked, its background color changes to green



document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();

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
    localStorage.setItem('formData', JSON.stringify(formData));

    const modalContent = document.getElementById("modal-content");

    // Once the data is saved in the local storage, the user gets a modal with the data he/she entered
    modalContent.innerHTML = `
    <h1 class="titles">Booking Successfull!</h1>
    <p class="subtitles">Dear ${formData.firstname} ${formData.lastname} your booking information is the following:</p>
    <p><span class="modal_text">Movie:</span> ${formData.movie}</p>
    <p><span class="modal_text">Cinema:</span> ${formData.cinema}</p>
    <p><span class="modal_text">City:</span> ${formData.city}</p>
    <p><span class="modal_text">Date:</span> ${formData.date}</p>
    <p><span class="modal_text">Showtime:</span> ${formData.showtime}</p>
    <p><span class="modal_text">No. Of Tickets:</span> ${formData.tickets}</p>
    <p><span class="modal_text">Total:</span> ${formData.total}</p>

    <p class="subtitles">An email has been sent to ${formData.email} with the booking information.</p>
    `;

    modal.showModal();


});

function capitalizeFirstLetter(str) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}