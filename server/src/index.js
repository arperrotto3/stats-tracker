const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const riotRoutes = require('./routes/riotRoutes');
require('dotenv').config();
require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/riot', riotRoutes);

app.get('/api/test', (req, res) => {
    res.json({message: 'Server is running!'});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
});