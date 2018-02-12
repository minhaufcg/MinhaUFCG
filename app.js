const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('./app/config/passport');
const RestHelper = require('./app/helpers/rest-helper');
const timeHelper = require('./app/helpers/time-helper');
const userRole = require('./app/config/connect-roles');

require('./app/models/db');
require('./app/config/passport');

const routesAPI = require('./app/routers/index');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ limit: '1mb', extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const expiryDate = timeHelper.getExpiryDate();
app.use(session({
    secret: 'minhaufcg',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: expiryDate
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(userRole.middleware());

app.use('/api', routesAPI);
app.get('/', (req, res) => { res.render('index'); });
app.get('*', (req, res) => { res.sendfile('./public/index.html'); });

app.use((err, req, res, next) => {
    RestHelper.sendJsonResponse(res, err.status || 500, {
        message: err.message,
        error: err
    })
});

module.exports = app;
