const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const RestHelper = require('./app/helpers/rest-helper');

require('./app/models/db');
require('./app/config/passport');

const routesAPI = require('./app/routers/index');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ limit: '1mb', extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use('/api', routesAPI);

app.get('/', (req, res) => {
    res.render('index');
});

app.get('*', (req, res) => {
    res.sendfile('./public/index.html');
});

app.use((err, req, res, next) => {
    RestHelper.sendJsonResponse(res, err.status || 500, {
        message: err.message,
        error: err
    })
});

module.exports = app;
