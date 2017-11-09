const mongoose = require('mongoose');
const User = mongoose.model('User');

mongoose.Promise = require('bluebird');


const sendJsonResponse = function sendJsonResponse(res, status, content) {
    res.status(status);
    res.json(content);
};

const usersReadOne = function (req, res) {
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
            sendJsonResponse(res, 201, user);
        })
        .catch(err => {
            sendJsonResponse(res, 400, err);
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
                sendJsonResponse(res, 200, oldUser);
            })
            .catch(err => {
                sendJsonResponse(res, 400, err);
            });

    } else {
        sendJsonResponse(res, 404, { "message": "No userId" });
    }
};

const usersDeleteOne = function (req, res) {
    const userId = req.params.userId;
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
