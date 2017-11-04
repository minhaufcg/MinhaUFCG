var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJsonResponse = function sendJsonResponse(res, status, content) {
    res.status(status);
    res.json(content);
};

var usersReadOne = function (req, res) {
    if (req.params && req.params.userId) {
        User
            .findById(req.params.userId)
            .exec(function (err, user) {
                if (!user) {
                    sendJsonResponse(res, 404, { "message": "User not found" });
                } else if (err) {
                    sendJsonResponse(res, 404, err);
                } else {
                    sendJsonResponse(res, 200, user);
                }
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
    User.create(newUser, function (err, user) {
        if (err) {
            sendJsonResponse(res, 400, err);
        } else {
            sendJsonResponse(res, 201, user);
        }
    });
};

var usersUpdateOne = function (req, res) {
    sendJsonResponse(res, 200, {"status": "success"});
};

var usersDeleteOne = function (req, res) {
    sendJsonResponse(res, 200, {"status": "success"});
};


module.exports = {
    usersReadOne: usersReadOne,
    usersCreateOne: usersCreateOne,
    usersUpdateOne: usersUpdateOne,
    usersDeleteOne: usersDeleteOne
};
