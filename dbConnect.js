const mongoose = require('mongoose');
const URL = 'mongodb://127.0.0.1:27017/resume-builder';  // Local database
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.on('connected', () => console.log('MongoDB connected successfully'));
connection.on('error', (error) => console.log(error));
