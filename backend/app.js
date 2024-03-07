console.clear()
require('dotenv').config()
const express = require('express');
const database = require('./src/config/database');
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
const LOCAL_DATABASE = process.env.LOCAL_DATABASE
const rootRouter = require('./src/routes/router')

// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

app.use('/api', rootRouter);


// Connect to MongoDB
database(LOCAL_DATABASE)
    .then(() => {
        console.log('Database Connected Successful');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}/health`);
        })
    })
    .catch((err) => {
        console.error(`MongoDB connection error: ${err}`);
});




