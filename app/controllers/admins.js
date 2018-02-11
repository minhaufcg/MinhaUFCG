const mongoose = require('mongoose');
const User = require('../models/users');
const RestHelper = require('../helpers/rest-helper');

mongoose.Promise = require('bluebird');


const addAdmin = function (req, res) {
    User.updateByRegistration(req, res, { isAdmin: true }); 
};

const removeAdmin = function (req, res) {
    User.updateByRegistration(req, res, { isAdmin: false }); 
};

const getUserByRegistration = function (req, res) {
    User.getByRegistration(req, res, req.params.registration);
};

module.exports = {
    addAdmin: addAdmin,
    removeAdmin: removeAdmin,
    getUserByRegistration: getUserByRegistration
};
