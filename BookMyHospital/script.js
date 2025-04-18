// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
// Set min and max date (today to today + 10 days)
document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('appointment-date');
    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 10);

    const formatDate = (date) => {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    dateInput.min = formatDate(today);
    dateInput.max = formatDate(maxDate);
});

// Function to generate a unique 11-character ID
function generateBookingID(length = 11) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// Booking form submission
const bookingForm = document.querySelector('#appointment-form form');
const confirmationBox = document.getElementById('confirmation-message');

bookingForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = this.querySelector('input[type="text"]').value.trim();
    const email = this.querySelector('input[type="email"]').value.trim();
    const phone = this.querySelector('input[type="tel"]').value.trim();
    const hospital = this.querySelector('select').value;
    const date = this.querySelector('input[type="date"]').value;
    const timeInput = this.querySelector('input[type="time"]').value.trim();

    if (!name || !email || !phone || !hospital || !date || !timeInput) {
        confirmationBox.style.color = 'red';
        confirmationBox.innerText = "❗ Please fill out all fields.";
        return;
    }

    const phonePattern = /^[6-9]\d{9}$/;
    if (!phonePattern.test(phone)) {
        confirmationBox.style.color = 'red';
        confirmationBox.innerText = "❗ Please enter a valid 10-digit Indian mobile number.";
        return;
    }

    // Convert time to 12-hour format
    const [hourStr, minute] = timeInput.split(':');
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;
    const time12 = `${hour}:${minute} ${ampm}`;

    const bookingID = generateBookingID();

    // Store in localStorage
    const appointment = {
        bookingID,
        name,
        email,
        phone,
        hospital,
        date,
        time: time12
    };
    localStorage.setItem(bookingID, JSON.stringify(appointment));

    // Show confirmation message
    confirmationBox.style.color = 'green';
    confirmationBox.innerHTML = `
        ✅ Appointment Booked Successfully!<br><br>
        <strong>📌 Booking ID:</strong> ${bookingID}<br>
        
    `;
    //<strong>👤 Name:</strong> ${name}<br>
    // <strong>🏥 Hospital:</strong> ${hospital}<br>
    // <strong>📅 Date:</strong> ${date}<br>
    // <strong>⏰ Time:</strong> ${time12}<br>
    // <strong>📞 Phone:</strong> ${phone}<br>
    // <strong>📧 Email:</strong> ${email}<br>
    // <br>💾 Data saved in localStorage (browser).

    this.reset(); // Clear the form
});


// Cancellation form submission
const cancelForm = document.querySelector('#cancel form');
const cancelMessage = document.getElementById('cancel-message');

cancelForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = this.querySelector('input[type="email"]').value.trim();
    const bookingId = this.querySelector('input[type="text"]').value.trim();

    if (!email || !bookingId) {
        cancelMessage.style.color = 'red';
        cancelMessage.innerHTML = "⚠️ Please fill in both Email and Booking ID.";
        return;
    }

    const appointmentData = localStorage.getItem(bookingId);

    if (!appointmentData) {
        cancelMessage.style.color = 'red';
        cancelMessage.innerHTML = "❗ No booking found with this Booking ID.";
        return;
    }

    const appointment = JSON.parse(appointmentData);

    if (appointment.email !== email) {
        cancelMessage.style.color = 'red';
        cancelMessage.innerHTML = "❗ Email does not match the one used during booking.";
        return;
    }

    // ✅ Remove the booking
    localStorage.removeItem(bookingId);

    cancelMessage.style.color = 'green';
    cancelMessage.innerHTML = `
        ✅ Appointment Cancelled Successfully!<br><br>
        <strong>📌 Booking ID:</strong> ${bookingId}<br>
        <strong>📧 Email:</strong> ${email}<br>
        <br>We hope to see you again. Stay healthy! 💚
    `;

    this.reset();
});


const viewForm = document.querySelector('#view-form');
const viewResult = document.getElementById('view-result');

viewForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const bookingID = this.querySelector('input[type="text"]').value.trim();

    const appointmentData = localStorage.getItem(bookingID);

    if (!appointmentData) {
        viewResult.style.color = 'red';
        viewResult.innerHTML = "❗ No appointment found with this Booking ID.";
        return;
    }

    const appointment = JSON.parse(appointmentData);
    viewResult.style.color = 'black';
    viewResult.innerHTML = `
        <strong>👤 Name:</strong> ${appointment.name}<br>
        <strong>📧 Email:</strong> ${appointment.email}<br>
        <strong>📞 Phone:</strong> ${appointment.phone}<br>
        <strong>🏥 Hospital:</strong> ${appointment.hospital}<br>
        <strong>📅 Date:</strong> ${appointment.date}<br>
        <strong>⏰ Time:</strong> ${appointment.time}<br>
        <strong>📌 Booking ID:</strong> ${appointment.bookingID}<br>
    `;
});

// Dropdown Menu
const menuToggle = document.querySelector('.menu-toggle');
const dropdown = document.querySelector('.dropdown');

menuToggle.addEventListener('click', () => {
    dropdown.classList.toggle('open');
});

// Optional: close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
    }
});
