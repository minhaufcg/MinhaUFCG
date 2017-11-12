const mongoose = require('mongoose');
const crypto =  require('crypto');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;


const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String, 
        enum: ["student", "teacher", "servant", "admin"],
        required: true
    },
    registration: {
        type: String,
        required: true
    },
    hash: String,
    salt: String
});

const NUMBER_OF_BYTES = 16;
const ENCODING = 'hex';
const ITERATIONS = 1000;
const KEYLEN = 64;
const DIGEST = 'sha512';


userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(NUMBER_OF_BYTES).toString(ENCODING);
  this.hash = crypto.pbkdf2Sync(password, this.salt, ITERATIONS, KEYLEN, DIGEST).toString(ENCODING);
};

userSchema.methods.validPassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, ITERATIONS, KEYLEN, DIGEST).toString(ENCODING);
  return this.hash === hash;
};

userSchema.method.generateJwt = function() {
    const NUMBER_OF_DAYS = 7;
    const THOUSAND_SECONDS = 1000;
    const SECRET = 'SECRET';
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + NUMBER_OF_DAYS);

    return jwt.sign({
        _id: this._id,
        name: this.name,
        email: this.email,
        exp: parseInt(expiry.getTime() / THOUSAND_SECONDS)
    }, SECRET);
};

mongoose.model("User", userSchema);
