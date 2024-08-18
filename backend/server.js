// import express library to create routes, middleware, and other application logic.
const express = require('express');

// import mongoose for db connection
const mongoose = require('mongoose');

// import dotenv
const dotenv = require('dotenv');

// This allows you to use environment variables from a .env file
dotenv.config();

// create an instance of express
const app = express();

// import routes
const routes = require('./routes'); // Use require instead of import

// use cors to make sure web browser reads
const cors = require('cors');

app.use(cors());


// Middleware to parse JSON bodies
app.use(express.json());

// Use routes; you can specify a base path if needed, e.g., '/api'
app.use('/api', routes);

// establish mongoose connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('MongoDB connection error:', err));

// create port 
const PORT = process.env.PORT || 5010;

app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
