const express = require('express');
const jwt = require('express-jwt');

const variables = require('../config/variables')
const requestsCtrl = require('../controllers/requests');
const usersCtrl = require('../controllers/users');

const router = express.Router();
const auth = jwt({
    secret: variables.secret,
    userProperty: 'payload'
});

router.get('/requests', auth, requestsCtrl.requestsCollection);
router.post('/requests', auth, requestsCtrl.requestsCreateOne);
router.get('/requests/:requestId', auth, requestsCtrl.requestsReadOne);
router.get('/user/:userId/requests', auth, requestsCtrl.getByAuthor);
router.put('/requests/:requestId', auth, requestsCtrl.requestsUpdateOne);
router.delete('/requests/:requestId', auth, requestsCtrl.requestsDeleteOne);


router.post('/users/', usersCtrl.usersCreateOne);
router.get('/users/:userId', auth, usersCtrl.usersReadOne);
router.put('/users/:userId', auth, usersCtrl.usersUpdateOne);
router.delete('/users/:userId', auth, usersCtrl.usersDeleteOne);
router.post('/login/', usersCtrl.login);

module.exports = router;
