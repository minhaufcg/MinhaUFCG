var mongoose = require('mongoose');
var Request = mongoose.model('Request');

mongoose.Promise = require('bluebird');


var sendJsonResponse = function sendJsonResponse(res, status, content) {
    res.status(status);
    res.json(content);
};

var requestsReadOne = function (req, res) {
    if (req.params && req.params.requestId) {
        Request
            .findById(req.params.requestId)
            .then(request => {
                if (!request) {
                    sendJsonResponse(res, 404, {"message": "Request not found"});
                } else {
                    sendJsonResponse(res, 200, request);
                }
            })
            .catch(err => {
                sendJsonResponse(res, 404, err);
            });
    } else {
        sendJsonResponse(res, 404, {"message": "No requestId"});
    }
};

var requestsCollection = function (req, res) {
    var query = req.query.status? {status: req.query.status} : {};
    Request
        .find(query)
        .then(requests => {
            sendJsonResponse(res, 200, requests);
        })
        .catch(err => {
            sendJsonResponse(res, 404, err);
        });
};

var requestsCreateOne = function (req, res) {
    var newRequest = {
        author: req.body.author,
        description: req.body.description,
        status: req.body.status,
        priority: req.body.priority,
        coords: req.body.coords
    };
    Request
        .create(newRequest)
        .then(request => {
            sendJsonResponse(res, 201, request);
        })
        .catch(err => {
            sendJsonResponse(res, 400, err);
        });
};

var requestsUpdateOne = function (req, res) {
    // TODO: use json patch 
    // author: Ruan Eloy 05/11/17
    var requestId = req.params.requestId;
    var update = {
        description: req.body.description,
        status: req.body.status,
        priority: req.body.priority,
        coords: req.body.coords
    };
    if(requestId) {
        Request
            .findOneAndUpdate({ "_id": requestId }, update)
            .then(oldRequest => {
                sendJsonResponse(res, 200, oldRequest);
            })
            .catch(err => {
                sendJsonResponse(res, 400, err);
            });
    } else {
        sendJsonResponse(res, 404, { "message": "No requestId" });
    }
};

var requestsDeleteOne = function (req, res) {
    var requestId = req.params.requestId;
    if(requestId) {
        Request
            .findByIdAndRemove(requestId)
            .then(request => {
                sendJsonResponse(res, 204, null);
            })
            .catch(err => {
                sendJsonResponse(res, 404, err);
            });
    } else {
        sendJsonResponse(res, 404, {"message": "No requestId"});
    }
};


module.exports = {
    requestsReadOne: requestsReadOne,
    requestsCollection: requestsCollection,
    requestsCreateOne: requestsCreateOne,
    requestsUpdateOne: requestsUpdateOne,
    requestsDeleteOne: requestsDeleteOne
};
