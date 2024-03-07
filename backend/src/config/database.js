const mongoose = require('mongoose');

const database = (mongoURI) => {
    return mongoose.connect(mongoURI);
}

module.exports = database;