// Function to generate a unique 11-character ID
function generateBookingID(length = 11) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

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

// Booking form submission
const bookingForm = document.querySelector('#appointment-form form');
bookingForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = this.querySelector('input[type="text"]').value.trim();
    const email = this.querySelector('input[type="email"]').value.trim();
    const phone = this.querySelector('input[type="tel"]').value.trim();
    const hospital = this.querySelector('select').value;
    const date = this.querySelector('input[type="date"]').value;
    const time = this.querySelector('#appointment-time').value.trim();
const timePattern = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i;

if (!timePattern.test(time)) {
    alert("❗ Please enter a valid time in 12-hour format (e.g., 10:30 AM)");
    return;
}


    const phonePattern = /^[6-9]\d{9}$/;

    if (!name || !email || !phone || !hospital || !date || !time) {
        alert("Please fill out all fields.");
        return;
    }

    if (!phonePattern.test(phone)) {
        alert("❗ Please enter a valid 10-digit Indian mobile number.");
        return;
    }

    const bookingID = generateBookingID();

    alert(`✅ Appointment Booked Successfully!

📌 Booking ID: ${bookingID}
👤 Name: ${name}
🏥 Hospital: ${hospital}
📅 Date: ${date}
⏰ Time: ${time}
📞 Phone: ${phone}
📧 Confirmation sent to: ${email}

Please save your Booking ID for cancellation.`);

    this.reset();
});

// Cancellation form submission
const cancelForm = document.querySelector('#cancel form');
cancelForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = this.querySelector('input[type="email"]').value;
    const bookingId = this.querySelector('input[type="text"]').value;

    if (!email || !bookingId) {
        alert("Please fill in both email and booking ID.");
        return;
    }

    alert(`❌ Appointment Cancelled

Booking ID: ${bookingId}
Email: ${email}

We're sorry to see you go. Stay healthy!`);

    this.reset();
});
