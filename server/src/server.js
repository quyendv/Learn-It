const express = require('express');

const connectDB = require('./config/db');
require('dotenv').config();

connectDB();

const app = express();

app.get('/', (req, res) => res.send('Hello quin, server is at root'));
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
