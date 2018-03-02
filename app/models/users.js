const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const constants = require('../config/constants');
const Utils = require('../helpers/utils');
const Q = require('q');

const Schema = mongoose.Schema;


const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: false
    },
    role: {
        type: String, 
        enum: ["student", "teacher", "servant", "admin"],
        required: true
    },
    registration: {
        type: String,
        unique: false,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    campus: {
        type: Schema.Types.ObjectId,
        ref : "Campus",
        required: true
    },
    verification: {
        type: String,
        enum: ["trusted", "untrusted", "rejected"],
        default: "untrusted"
    },
    hash: String
});

userSchema.methods.setPassword = function(password){
    const NUMBER_OF_ROUNDS = 11;
    const salt = bcrypt.genSaltSync(NUMBER_OF_ROUNDS);
    this.hash = bcrypt.hashSync(password, salt);
};

userSchema.methods.isValidPassword = function(password) {
  return bcrypt.compareSync(password, this.hash);
};

userSchema.methods.generateJwt = function() {
    const NUMBER_OF_DAYS = 1;
    const THOUSAND_SECONDS = 1000;
    const secret = constants.secret;
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + NUMBER_OF_DAYS);
    
    const payload = Utils.makeUser(this);
    const token = jwt.sign(
        payload, 
        secret,
        { expiresIn: parseInt(expiry.getTime() / THOUSAND_SECONDS) }
    );

    return token;
};

userSchema.methods.isRejected = function() {
    return this.verification == "rejected";
}

userSchema.statics.getByRegistration = function(registration) {
    var deferred = Q.defer();
    this.findOne({ registration : registration })
    .then(user => {
        if (!user) {
            deferred.reject({ message: "User not found" });
        } else {
            deferred.resolve(Utils.makeUser(user));
        }
    })
    .catch(err => {
        deferred.reject(err);
    });
    return deferred.promise;
};

userSchema.statics.update = function (userId, patch) {
    var deferred = Q.defer();
    this.findByIdAndUpdate({ "_id": userId }, patch)
        .then(oldUser => {
            deferred.resolve(oldUser);
        })
        .catch(err => {
            deferred.reject(err);
        });
    return deferred.promise;
};

userSchema.statics.updateByRegistration = function (registration, update) {
    var deferred = Q.defer();
    this.findOneAndUpdate({ "registration": registration }, update)
        .then(oldUser => {
            deferred.resolve(oldUser);
        })
        .catch(err => {
            deferred.reject(err);
        });
    return deferred.promise;
};

userSchema.statics.getByPropertyValue = function (property, value) {
    var deferred = Q.defer();
    var query = {};
    query[property] = value;
    this.find(query)
        .then(users => {
            deferred.resolve(users);
        })
        .catch(err => {
            deferred.reject(err);
        });
    return deferred.promise;
}

userSchema.statics.findAll = function () {
    var deferred = Q.defer();
    this.find()
        .then(users => {
            deferred.resolve(users);
        })
        .catch(err => {
            deferred.reject(err);
        });
    return deferred.promise;
}


module.exports = mongoose.model("User", userSchema);
