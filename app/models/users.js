const mongoose = require('mongoose');
const crypto =  require('crypto');
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

const BYTES_NUMBER = 16;
const ENCODING = 'hex';
const ITERATIONS = 1000;
const KEYLEN = 64;
const DIGEST = 'sha512';

userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(BYTES_NUMBER).toString(ENCODING);
  this.hash = crypto.pbkdf2Sync(password, this.salt, ITERATIONS, KEYLEN, DIGEST).toString(ENCODING);
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, ITERATIONS, KEYLEN, DIGEST).toString(ENCODING);
  return this.hash === hash;
};

mongoose.model("User", userSchema);
