const mongoose = require('mongoose');
const User = require('../models/users');
const RestHelper = require('../helpers/rest-helper');
const passport = require('passport');

mongoose.Promise = require('bluebird');

const usersReadOne = function (req, res) {
    if (req.params.userId) {
        User
            .findById(req.params.userId)
            .then(user => {
                if (!user) {
                    RestHelper.sendJsonResponse(res, 404, { "message": "User not found" });
                } else {
                    RestHelper.sendJsonResponse(res, 200, user);
                }
            })
            .catch(err => {
                RestHelper.sendJsonResponse(res, 404, err);
            });
    } else {
        RestHelper.sendJsonResponse(res, 404, { "message": "No userId in request" });
    }
};

const usersCreateOne = function (req, res) {
    const newUser = new User();
    newUser.name = req.body.name;
    newUser.email = req.body.email;
    newUser.role = req.body.role;
    newUser.registration = req.body.registration;
    newUser.setPassword(req.body.password);
    newUser.campus = req.body.campus;
    
    newUser
        .save()
        .then(user => {
            const token = newUser.generateJwt();
            RestHelper.sendJsonResponse(res, 201, {"token": token});
        })
        .catch(err => {
            RestHelper.sendJsonResponse(res, 400, err);
        });
};

const usersUpdateOne = function (req, res) {
    const userId = req.params.userId;
    const patch = req.body;

    if(userId) {
        User.update(userId, patch)
        .then(oldUser => {
            RestHelper.sendJsonResponse(res, 200, oldUser);
        })
        .catch(err => {
            RestHelper.sendJsonResponse(res, 400, err);
        });
    } else {
        RestHelper.sendJsonResponse(res, 404, { "message": "No userId" });
    }
};

const usersDeleteOne = function (req, res) {
    const userId = req.params.userId;
    if(userId) {
        User
            .findByIdAndRemove(userId)
            .then(user => {
                RestHelper.sendJsonResponse(res, 204, null);
            })
            .catch(err => {
                RestHelper.sendJsonResponse(res, 400, err);
            });
    } else {
        RestHelper.sendJsonResponse(res, 200, {"message": "No userId"});
    }
};

const getUsersByProperty = function (req, res) {
    var queryKeys = Object.keys(req.query);
    var property = queryKeys[0] || "";
    var value = req.query[property] || "";

    User.getByPropertyValue(property, value)
    .then(users => {
        RestHelper.sendJsonResponse(res, 200, users);
    })
    .catch(err => {
        RestHelper.sendJsonResponse(res, 400, err);
    });
};

const findAll = function (req, res) {
    User.findAll()
    .then(users => {
        RestHelper.sendJsonResponse(res, 200, users);
    })
    .catch(err => {
        RestHelper.sendJsonResponse(res, 400, err);
    });
};

module.exports = {
    usersReadOne: usersReadOne,
    usersCreateOne: usersCreateOne,
    usersUpdateOne: usersUpdateOne,
    usersDeleteOne: usersDeleteOne,
    getUsersByProperty: getUsersByProperty,
    findAll: findAll
};
