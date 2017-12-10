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
    newUser.name = req.body.name,
    newUser.email = req.body.email,
    newUser.role = req.body.role,
    newUser.registration = req.body.registration
    newUser.setPassword(req.body.password);
    
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
    const properties = ['name', 'role'];
    const update = {};
    for(prop of properties) {
        if(req.body[prop]) {
            update[prop] = req.body[prop];
        }
    }

    User.update(req, res, update);
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
            req.login(user, function (err){
                if(err) { 
                    RestHelper.sendJsonResponse(res, 404, err);
                }
                req.session.save(() => {
                    const token = user.generateJwt();
                    RestHelper.sendJsonResponse(res, 200, {token: token});
                })
            });
        } else {
            RestHelper.sendJsonResponse(res, 401, info);
        }
    })(req, res);
};

const logout = function (req, res) {
    req.logout();
    RestHelper.sendJsonResponse(res, 200, null);
};

module.exports = {
    usersReadOne: usersReadOne,
    usersCreateOne: usersCreateOne,
    usersUpdateOne: usersUpdateOne,
    usersDeleteOne: usersDeleteOne,
    login: login,
    logout: logout
};
