const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();
require('dotenv').config();
const cors = require('cors');

// Connect to DB server
connectDB();

const { PORT } = process.env;

// Initial Middleware
app.use(express.json({ extended: false })); // Allow data to come through request body
app.options('*', cors());

app.get('/', (req, res) => res.send('API is up and Running'));

//Define application routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
