const mongoose = require('mongoose');
const User = require('../models/users');
const RestHelper = require('../helpers/rest-helper');

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

const auth = function (req,res) {
      if (req.body.registration && req.body.password) {
          User.getByRegistration(req.body.registration)
          .then (function (user) {
              user = user[0];

              if (!user) {
                  RestHelper.sendJsonResponse(res, 404, { "message": "User not found" });
              }

              else {
                  if (user.password === req.body.password) {
                      RestHelper.sendJsonResponse(res, 200, user);
                  }

                  else {
                      RestHelper.sendJsonResponse(res, 403, { "message" : "Not authorized"});
                  }
              }
          })
          .catch( function () {
              RestHelper.sendJsonResponse(res, 403, err);
          });
      }
      else {
          RestHelper.sendJsonResponse(res, 403, { "message" : "Not authorized"});
      }
};

const usersCreateOne = function (req, res) {
    const newUser = {
        name: req.body.name,
        role: req.body.role,
        registration: req.body.registration,
        password: req.body.password
    };

    User
        .create(newUser)
        .then(user => {
            RestHelper.sendJsonResponse(res, 201, user);
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


module.exports = {
    usersReadOne: usersReadOne,
    usersCreateOne: usersCreateOne,
    usersUpdateOne: usersUpdateOne,
    usersDeleteOne: usersDeleteOne,
    auth : auth
};
