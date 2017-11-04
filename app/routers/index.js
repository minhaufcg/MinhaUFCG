var express = require('express');
var router = express.Router();

var requestsCtrl = require('../controllers/requests');
var usersCtrl = require('../controllers/users');


router.get('/requests', requestsCtrl.requestsCollection);
router.post('/requests', requestsCtrl.requestsCreateOne);
router.get('/requests/:requestId', requestsCtrl.requestsReadOne);
router.put('/requests/:requestId', requestsCtrl.requestsUpdateOne);
router.delete('/requests/:requestId', requestsCtrl.requestsDeleteOne);


router.post('/users', usersCtrl.usersCreateOne);
router.get('/users/:userId', usersCtrl.usersReadOne);
router.put('/users/:userId', usersCtrl.usersUpdateOne);
router.delete('/users/:userId', usersCtrl.usersDeleteOne);


module.exports = router;
