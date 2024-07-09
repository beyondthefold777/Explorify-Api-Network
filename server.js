const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const app = express();
const port = 3001;

// Use environment variables for connection string
const { MONGO_USER, MONGO_PASSWORD, MONGO_DB } = process.env;

// Construct the connection string for local MongoDB
const connectionString = `mongodb://localhost:27017/${MONGO_DB}`;

mongoose.connect(connectionString)
  .then(() => {
    console.log('Connected successfully to MongoDB');
    app.listen(port, () => {
      console.log(`Server is listening at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Mongo connection error: ', err.message);
  });