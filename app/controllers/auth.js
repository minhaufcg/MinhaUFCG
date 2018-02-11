const mongoose = require('mongoose');
const User = require('../models/users');
const RestHelper = require('../helpers/rest-helper');
const passport = require('passport');


const login = function (req, res) {
    passport.authenticate('local', (err, user, info) => {
        if(err) {
            RestHelper.sendJsonResponse(res, 404, err);
        } else if(user && user.isRejected()) {
            RestHelper.sendJsonResponse(res, 404, {message: "The user was rejected"});
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
    login: login,
    logout: logout
};