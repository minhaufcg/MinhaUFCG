var mongoose = require('mongoose');
var User = mongoose.model('User');

mongoose.Promise = require('bluebird');


var sendJsonResponse = function sendJsonResponse(res, status, content) {
    res.status(status);
    res.json(content);
};

var usersReadOne = function (req, res) {
    if (req.params.userId) {
        User
            .findById(req.params.userId)
            .then(user => {
                if (!user) {
                    sendJsonResponse(res, 404, { "message": "User not found" });
                } else {
                    sendJsonResponse(res, 200, user);
                }
            })
            .catch(err => {
                sendJsonResponse(res, 404, err);
            });
    } else {
        sendJsonResponse(res, 404, { "message": "No userId in request" });
    }
};

var usersCreateOne = function (req, res) {
    var newUser = {
        name: req.body.name,
        role: req.body.role,
        registration: req.body.registration
    };

    User
        .create(newUser)
        .then(user => {
            sendJsonResponse(res, 201, user);
        })
        .catch(err => {
            sendJsonResponse(res, 400, err);
        });
};

var usersUpdateOne = function (req, res) {
    var userId = req.params.userId;
    var update = {
        name: req.body.name,
        role: req.body.role
    };

    if(userId) {
        User
            .findByIdAndUpdate({"_id": userId}, update)
            .then(oldUser => {
                sendJsonResponse(res, 200, oldUser);
            })
            .catch(err => {
                sendJsonResponse(res, 400, err);
            });

    } else {
        sendJsonResponse(res, 404, { "message": "No userId" });
    }
};

var usersDeleteOne = function (req, res) {
    var userId = req.params.userId;
    if(userId) {
        User
            .findByIdAndRemove(userId)
            .then(user => {
                sendJsonResponse(res, 204, null);
            })
            .catch(err => {
                sendJsonResponse(res, 400, err);
            });
    } else {
        sendJsonResponse(res, 200, {"message": "No userId"});
    }
};


module.exports = {
    usersReadOne: usersReadOne,
    usersCreateOne: usersCreateOne,
    usersUpdateOne: usersUpdateOne,
    usersDeleteOne: usersDeleteOne
};
