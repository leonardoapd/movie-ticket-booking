// MovieTicket.js
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

export default MovieTicket;
