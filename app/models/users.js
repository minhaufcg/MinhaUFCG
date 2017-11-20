const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const variables = require('../config/variables');

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
    const secret = variables.secret;
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + NUMBER_OF_DAYS);
    
    const payload = { 
        _id: this._id,
        registration: this.registration
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

module.exports = mongoose.model("User", userSchema);
