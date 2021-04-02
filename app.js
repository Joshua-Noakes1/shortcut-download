const express = require('express');
const app = express();

const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// components
const twitter = require('./endpoint/twitter/twitter');
const reddit = require('./endpoint/reddit/reddit');

// dev
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(cors({
    origin: '*'
}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST');
        return;
    }
    next();
});



// routes
app.use('/twitter', twitter);
app.use('/reddit', reddit);

app.get('/status', (req, res) => {
    res.status(200).json({
        message: '🚀 The rocket has launched 🚀'
    });
});



// Errors
app.use((req, res, next) => {
    const error = new Error('❌ Not Found ❌');
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        message: error.message
    });
});

module.exports = app;