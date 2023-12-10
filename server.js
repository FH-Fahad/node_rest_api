require('dotenv').config();
const express = require('express');
const app = express();

const connection = require('./models/db');
const usersRoute = require('./routes/users');

// Connect to MongoDB
connection();

app.use(express.json());

// Import routes
app.use('/users', usersRoute);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
