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
    const update = {
        name: req.body.name,
        role: req.body.role
    };

    if(userId) {
        User
            .findByIdAndUpdate({"_id": userId}, update)
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

const login = function (req, res) {
    passport.authenticate('local', (err, user, info) => {
        if(err) {
            RestHelper.sendJsonResponse(res, 404, err);
        } else if(user) {
            const token = user.generateJwt();
            RestHelper.sendJsonResponse(res, 200, {token: token});
        } else {
            RestHelper.sendJsonResponse(res, 401, info);
        }
    })(req, res);
};

module.exports = {
    usersReadOne: usersReadOne,
    usersCreateOne: usersCreateOne,
    usersUpdateOne: usersUpdateOne,
    usersDeleteOne: usersDeleteOne,
    login: login
};
