const mongoose = require('mongoose');
const Request = require('../models/requests');
const RestHelper = require('../helpers/rest-helper')
mongoose.Promise = require('bluebird');

const requestsReadOne = function (req, res) {
    if (req.params && req.params.requestId) {
        Request
            .findById(req.params.requestId)
            .then(request => {
                if (!request) {
                    RestHelper.sendJsonResponse(res, 404, {"message": "Request not found"});
                } else {
                    RestHelper.sendJsonResponse(res, 200, request);
                }
            })
            .catch(err => {
                RestHelper.sendJsonResponse(res, 404, err);
            });
    } else {
        RestHelper.sendJsonResponse(res, 404, {"message": "No requestId"});
    }
};

const requestsCollection = function (req, res) {
    const query = req.query.status? {status: req.query.status} : {};
    Request
        .find(query)
        .then(requests => {
            RestHelper.sendJsonResponse(res, 200, requests);
        })
        .catch(err => {
            RestHelper.sendJsonResponse(res, 404, err);
        });
};

const requestsCreateOne = function (req, res) {
    const newRequest = {
        author: req.body.author,
        title : req.body.request.title,
        description: req.body.request.description,
        location: req.body.request.location,
        img: req.body.request.img
    };
    Request
        .create(newRequest)
        .then(request => {
            RestHelper.sendJsonResponse(res, 201, request);
        })
        .catch(err => {
            RestHelper.sendJsonResponse(res, 400, err);
        });
};

const requestsUpdateOne = function (req, res) {
    // TODO: use json patch 
    // author: Ruan Eloy 05/11/17
    const requestId = req.params.requestId;
    const update = {
        description: req.body.description,
        status: req.body.status,
        coords: req.body.coords
    };
    if(requestId) {
        Request
            .findOneAndUpdate({ "_id": requestId }, update)
            .then(oldRequest => {
                RestHelper.sendJsonResponse(res, 200, oldRequest);
            })
            .catch(err => {
                RestHelper.sendJsonResponse(res, 400, err);
            });
    } else {
        RestHelper.sendJsonResponse(res, 404, { "message": "No requestId" });
    }
};

const requestsDeleteOne = function (req, res) {
    const requestId = req.params.requestId;
    if(requestId) {
        Request
            .findByIdAndRemove(requestId)
            .then(request => {
                RestHelper.sendJsonResponse(res, 204, null);
            })
            .catch(err => {
                RestHelper.sendJsonResponse(res, 404, err);
            });
    } else {
        RestHelper.sendJsonResponse(res, 404, {"message": "No requestId"});
    }
};


const getByAuthor = function (req, res) {
    const userId = req.params.userId;
    if (userId) {
        console.log(userId);
        Request.getByAuthor(userId)
            .then(function (requests) {
                RestHelper.sendJsonResponse(res,200,requests);
            })
            .catch(function (err) {
                RestHelper.sendJsonResponse(res,404, err);
            });
    } else {
        RestHelper.sendJsonResponse(res, 300, {"message" : "Missing user id"});
    }
};

module.exports = {
    requestsReadOne: requestsReadOne,
    getByAuthor : getByAuthor,
    requestsCollection: requestsCollection,
    requestsCreateOne: requestsCreateOne,
    requestsUpdateOne: requestsUpdateOne,
    requestsDeleteOne: requestsDeleteOne
};
