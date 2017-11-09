const express = require('express');
const router = express.Router();

const requestsCtrl = require('../controllers/requests');
const usersCtrl = require('../controllers/users');


router.get('/requests', requestsCtrl.requestsCollection);
router.post('/requests', requestsCtrl.requestsCreateOne);
router.get('/requests/:requestId', requestsCtrl.requestsReadOne);
router.put('/requests/:requestId', requestsCtrl.requestsUpdateOne);
router.delete('/requests/:requestId', requestsCtrl.requestsDeleteOne);


router.post('/users/', usersCtrl.usersCreateOne);
router.post('/auth/', usersCtrl.auth);
router.get('/users/:userId', usersCtrl.usersReadOne);
router.put('/users/:userId', usersCtrl.usersUpdateOne);
router.delete('/users/:userId', usersCtrl.usersDeleteOne);

router.get('*', (req, res) => res.sendFile('/public/index.html'));


module.exports = router;
