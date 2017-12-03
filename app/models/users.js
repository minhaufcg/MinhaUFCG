const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const constants = require('../config/constants');
const RestHelper = require('../helpers/rest-helper');

mongoose.Promise = require('bluebird');

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
    
    const payload = { 
        id: this._id,
        registration: this.registration,
        name: this.name,
        isAdmin: this.isAdmin
    };

    const token = jwt.sign(
        payload, 
        secret,
        { expiresIn: parseInt(expiry.getTime() / THOUSAND_SECONDS) }
    );

    return token;
};

userSchema.statics.getByRegistration = function(registration) {
    this.find({registration : registration})
    .then(user => {
        return user;
    })
    .catch(err => {
        return null;
    });
};

userSchema.statics.update = function (req, res, update) {
    const userId = req.params.userId;
    
    if(userId) {
        this.findByIdAndUpdate({ "_id": userId }, update)
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

module.exports = mongoose.model("User", userSchema);
