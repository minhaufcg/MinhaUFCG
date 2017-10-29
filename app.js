var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

require('./app/models/db');
require('./app/models/requests');

var routesAPI = require('./app/routers/index');

var app = express();

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
