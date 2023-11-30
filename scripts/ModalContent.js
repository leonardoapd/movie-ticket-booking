// ModalContent.js
export function displayModalContent(formData) {
	const modalContent = document.getElementById('modal-content');

	modalContent.innerHTML = `
    <h1 class="titles">Booking Successful!</h1>
    <p class="subtitles">Dear ${formData.firstname} ${formData.lastname}, your booking information is as follows:</p>
    <p><span class="modal_text">Movie:</span> ${formData.movie}</p>
    <p><span class="modal_text">Cinema:</span> ${formData.cinema}</p>
    <p><span class="modal_text">City:</span> ${formData.city}</p>
    <p><span class="modal_text">Date:</span> ${formData.date}</p>
    <p><span class="modal_text">Showtime:</span> ${formData.showtime}</p>
    <p><span class="modal_text">No. Of Tickets:</span> ${formData.tickets}</p>
    <p><span class="modal_text">Total:</span> ${formData.total}</p>

    <p class="subtitles">An email has been sent to ${formData.email} with the booking information.</p>
    `;
}
