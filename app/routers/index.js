const express = require('express');
const jwt = require('express-jwt');
const userRole = require('../config/connect-roles');

const constants = require('../config/constants')
const requestsCtrl = require('../controllers/requests');
const usersCtrl = require('../controllers/users');
const adminsCtrl = require('../controllers/admins');
const locationsCtrl = require('../controllers/locations');
const authCtrl = require('../controllers/auth');

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
router.get('/users/untrusted', auth, userRole.can('access admin route'), usersCtrl.getPendentUsers);
router.get('/users/:userId', auth, usersCtrl.usersReadOne);
router.put('/users/:userId', auth, usersCtrl.usersUpdateOne);
router.delete('/users/:userId', auth, usersCtrl.usersDeleteOne);

router.post('/login/', authCtrl.login);
router.get('/logout/', authCtrl.logout);

router.get('/admins/:registration', auth, userRole.can('access admin route'), adminsCtrl.getUserByRegistration);
router.post('/admins/:registration', auth, userRole.can('access admin route'), adminsCtrl.addAdmin);
router.delete('/admins/:registration', auth, userRole.can('access admin route'), adminsCtrl.removeAdmin);

router.get('/campi/', locationsCtrl.getAllCampi);
router.get('/campi/:campusId/coords', locationsCtrl.getCampusCoords);

module.exports = router;
