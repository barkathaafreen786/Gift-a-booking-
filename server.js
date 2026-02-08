const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Mock Database for Bookings
const bookings = [];

// API Endpoint to Create a Booking
app.post('/api/book', (req, res) => {
    const { yourName, yourEmail, recipientName, message, sceneId, date } = req.body;

    if (!yourName || !yourEmail || !sceneId || !recipientName) {
        return res.status(400).json({ message: 'Please fill in all required fields.' });
    }

    const newBooking = {
        id: bookings.length + 1,
        sender: { name: yourName, email: yourEmail },
        recipient: { name: recipientName },
        message: message || "No message",
        sceneId,
        preferredDate: date || "Open Date",
        createdAt: new Date()
    };

    bookings.push(newBooking);
    console.log('New Booking Received:', newBooking);

    res.status(201).json({
        message: 'Your scene has been successfully booked!',
        booking: newBooking
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
