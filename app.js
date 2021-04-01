const express = require('express');
const app = express();

const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// components


// dev
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cors({
    origin: '*'
}));

// routes
app.get('/', (req, res) => {
    res.status(200).json({
        message: '🚀 The rocket has launched 🚀'
    });
});

module.exports = app;