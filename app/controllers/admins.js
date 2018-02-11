const mongoose = require('mongoose');
const User = require('../models/users');
const RestHelper = require('../helpers/rest-helper');

mongoose.Promise = require('bluebird');


const addAdmin = function (req, res) {
    updateAdminRights(req, res, true);
};

const removeAdmin = function (req, res) {
    updateAdminRights(req, res, false);
};

const getUserByRegistration = function (req, res) {
    var registration = req.params.registration;
    
    if(registration) {
        User.getByRegistration(registration)
        .then(user => {
            RestHelper.sendJsonResponse(res, 200, user);
        })
        .catch(err => {
            RestHelper.sendJsonResponse(res, 404, err);
        });
    } else {
        RestHelper.sendJsonResponse(res, 404, { message: "No user registration found" });
    }
};

function updateAdminRights(req, res, isAdmin) {
    const registration = req.params.registration;
    
    if(registration) {
        User.updateByRegistration(registration, { isAdmin: isAdmin })
        .then(oldUser => {
            RestHelper.sendJsonResponse(res, 200, oldUser);
        }).catch(err => {
            RestHelper.sendJsonResponse(res, 400, err);
        });
    } else {
        RestHelper.sendJsonResponse(res, 404, { message: "No user registration found" });
    }
}

module.exports = {
    addAdmin: addAdmin,
    removeAdmin: removeAdmin,
    getUserByRegistration: getUserByRegistration
};
