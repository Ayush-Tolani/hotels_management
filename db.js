const mongoose = require('mongoose');

require('dotenv').config();
//const mongoURL_local =process.env.mongoURL_local;
const mongoURL=process.env.mongoURL;
mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to MongoDB server');
});

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

db.on('disconnected', () => {
    console.log('MongoDB Disconnected');
});

module.exports = db;
