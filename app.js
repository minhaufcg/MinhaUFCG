const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');

require('./app/models/db');

const routesAPI = require('./app/routers/index');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', routesAPI);

app.get('/', function(req, res) {
    res.render('index');
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: err
    });
});


module.exports = app;
