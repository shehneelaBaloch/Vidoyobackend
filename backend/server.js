const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Import Routes
const contactRoutes = require('./routes/contactRoutes');
const orderRoutes = require('./routes/orderRoutes');

dotenv.config();
const app = express();

// CORS Configuration
app.use(cors({
  origin: 'https://vidoyo.netlify.app', // Your frontend URL
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

// Handle OPTIONS requests for CORS preflight
app.options('*', cors());

// Middleware to parse JSON and URL-encoded data
app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded bodies

// Database connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/order', orderRoutes);

// Catch-all route for undefined endpoints (optional for debugging)
app.use((req, res, next) => {
  res.status(404).send('Route not found');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
