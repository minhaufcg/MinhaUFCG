const mongoose = require('mongoose');
const Campus = require('../models/campi');
const Coordinations = require('../models/coords');
const RestHelper = require('../helpers/rest-helper');
mongoose.Promise = require('bluebird');

function getAllCampi (req, res) {
    Campus
        .find({}).then(function (data) {
            console.log(data);
            RestHelper.sendJsonResponse(res, 200, data);
        })
}

function getCampusCoords(req, res) {
    if (!req.params || !req.params.campusId)
        RestHelper.sendJsonResponse(res, 404, {error : "No campus ID provided"});

    var campusId = req.params.campusId;

    Coordinations
        .getByCampus(campusId).then(function (coords) {
            RestHelper.sendJsonResponse(res, 200, coords);
        })
}

module.exports = {
    getAllCampi : getAllCampi,
    getCampusCoords : getCampusCoords
};