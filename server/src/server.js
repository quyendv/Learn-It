const express = require('express');

const cors = require('cors');
const connectDB = require('./config/db');
const route = require('./routes');
require('dotenv').config();

connectDB();

const app = express();

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

route(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
