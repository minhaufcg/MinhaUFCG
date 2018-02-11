const mongoose = require('mongoose');
const Campus = require('../models/campi');
mongoose.Promise = require('bluebird');
    
const DEFAULT_PROPERTIES = ["_id", "registration", "name", "role", "isAdmin", "campus"];

const makeUser = function (user, properties=DEFAULT_PROPERTIES) {
    const makedUser = {};

    for(prop of properties) {
        makedUser[prop] = user[prop];
    }

    return makedUser;
};


module.exports = {
    makeUser: makeUser
}
