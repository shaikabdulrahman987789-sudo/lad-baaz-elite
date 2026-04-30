document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    const confirmationMessage = document.getElementById('confirmationMessage');

    // Set minimum date to today
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;

    // Handle form submission
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Collect form data
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            service: document.getElementById('service').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            measurements: document.getElementById('measurements').value,
            notes: document.getElementById('notes').value,
            bookingTime: new Date().toISOString()
        };

        // Store in localStorage (for demo purposes)
        let bookings = JSON.parse(localStorage.getItem('alrahmanBookings')) || [];
        bookings.push(formData);
        localStorage.setItem('alrahmanBookings', JSON.stringify(bookings));

        // Log to console
        console.log('Booking Created:', formData);

        // Show confirmation message
        bookingForm.style.display = 'none';
        confirmationMessage.style.display = 'block';

        // Reset form
        bookingForm.reset();

        // Optional: Send to server (uncomment when backend is ready)
        // sendBookingToServer(formData);

        // Hide confirmation and reset form after 5 seconds
        setTimeout(() => {
            confirmationMessage.style.display = 'none';
            bookingForm.style.display = 'block';
        }, 5000);
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Validate phone number
    document.getElementById('phone').addEventListener('input', function(e) {
        this.value = this.value.replace(/[^0-9+]/g, '');
    });
});

// Function to send booking to server (for future backend integration)
function sendBookingToServer(formData) {
    fetch('/api/bookings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Booking sent successfully:', data);
    })
    .catch(error => {
        console.error('Error sending booking:', error);
    });
}