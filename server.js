require('dotenv').config();
const express = require('express');
const app = express();
const connection = require('./models/db');

// Connect to MongoDB
connection();

app.use(express.json());

// Import routes
const usersRoute = require('./routes/users');
app.use('/users', usersRoute);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
