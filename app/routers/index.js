const express = require('express');
const jwt = require('express-jwt');
const userRole = require('../config/connect-roles');

const constants = require('../config/constants')
const requestsCtrl = require('../controllers/requests');
const usersCtrl = require('../controllers/users');
const adminsCtrl = require('../controllers/admins');

const router = express.Router();
const auth = jwt({
    secret: constants.secret,
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
router.get('/logout/', usersCtrl.logout);

router.post('/admins/:userId', userRole.can('access admin route'), auth, adminsCtrl.addAdmin);
router.delete('/admins/:userId', userRole.can('access admin route'), auth, adminsCtrl.removeAdmin);

module.exports = router;
