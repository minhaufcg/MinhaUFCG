const mongoose = require('mongoose');
const User = require('../models/users');
const RestHelper = require('../helpers/rest-helper');

mongoose.Promise = require('bluebird');


const addAdmin = function (req, res) {
    User.update(req, res, { isAdmin: true }); 
};

const removeAdmin = function (req, res) {
    User.update(req, res, { isAdmin: false }); 
};


module.exports = {
    addAdmin: addAdmin,
    removeAdmin: removeAdmin
};
