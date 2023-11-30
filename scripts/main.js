// Main.js
import MovieTicket from './MovieTicket.js';
import { loadHeaderAndFooter, changeBGColorRadio, loadModalElements, loadJSON } from './DOMUtils.js';
import { initializeListeners } from './Listeners.js';

function startUp() {
	loadHeaderAndFooter();
	loadJSON();
	loadModalElements();
	changeBGColorRadio();
	initializeListeners();
}

window.onload = startUp;
