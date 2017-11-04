var mongoose = require('mongoose');
var Request = mongoose.model('Request');


var sendJsonResponse = function sendJsonResponse(res, status, content) {
    res.status(status);
    res.json(content);
};

var requestsReadOne = function (req, res) {
    if (req.params && req.params.requestId) {
        Request
            .findById(req.params.requestId)
            .exec(function (err, request) {
                if (!request) {
                    sendJsonResponse(res, 404, {"message": "Request not found"});
                } else if (err) {
                    sendJsonResponse(res, 404, err);
                } else {
                    sendJsonResponse(res, 200, request);
                }
            });
    } else {
        sendJsonResponse(res, 404, {"message": "No requestId in request"});
    }
};

var requestsCollection = function (req, res) {
    sendJsonResponse(res, 200, {"status": "success"});
};

var requestsCreateOne = function (req, res) {
    var newRequest = {
        author: req.body.author,
        description: req.body.description,
        status: req.body.status,
        priority: req.body.priority,
        coords: req.body.coords
    };
    Request.create(newRequest, function (err, request) {
        if (err) {
            sendJsonResponse(res, 400, err);
        } else {
            sendJsonResponse(res, 201, request);
        }
    });
};

var requestsUpdateOne = function (req, res) {
    sendJsonResponse(res, 200, {"status": "success"});
};

var requestsDeleteOne = function (req, res) {
    sendJsonResponse(res, 200, {"status": "success"});
};


module.exports = {
    requestsReadOne: requestsReadOne,
    requestsCollection: requestsCollection,
    requestsCreateOne: requestsCreateOne,
    requestsUpdateOne: requestsUpdateOne,
    requestsDeleteOne: requestsDeleteOne
};
