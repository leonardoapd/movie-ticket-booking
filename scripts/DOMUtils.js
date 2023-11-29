function loadHeaderAndFooter() {
	const pageTitle = `Winter 2023 Assignment #1 for Leonardo A Perdomo from Colombia`;
	document.getElementById('subtitle').innerHTML = pageTitle;

	const footerText = `My Login: PerdomoD - My ID: 991669214 - My Program: Computer Programming - Software Engineering <br>
                            &copy; ${new Date().getFullYear()} Leonardo A Perdomo - All Rights Reserved.`;
	document.getElementById('footer_text').innerHTML = footerText;
}

function loadModalElements() {
	//The elements of the modal are gotten
	const modal = document.getElementById('modal');
	const closeModal = document.getElementById('close-modal');

	//Function to close the modal
	closeModal.onclick = () => {
		modal.close();
		//reload the page
		location.reload();
	};
}

function loadJSON() {
	let citiesJSONPath = '../data/perdomod.json';

	// Fetch the JSON file
	fetch(citiesJSONPath)
		.then((response) => {
			return response.json();
		})
		.then((json) => {
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
	let radiobtn = document.getElementsByClassName('radiobtn');
	for (let i = 0; i < radiobtn.length; i++) {
		radiobtn[i].addEventListener('click', function () {
			for (let y = 0; y < radiobtn.length; y++) {
				radiobtn[y].style.backgroundColor = '';
			}
			this.style.backgroundColor = '#00A7E1';
		});
	}
}

export { loadHeaderAndFooter, loadModalElements, loadJSON, changeBGColorRadio };
