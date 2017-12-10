const passport = require('passport');
const LocalStratagy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require('../models/users');

mongoose.Promise = require('bluebird');

passport.use(
    new LocalStratagy({
        usernameField: 'registration'
    }, function (registration, password, done) {
        User.findOne({registration: registration})
            .then(user => {
                if(!user) {
                    return done(null, false, {message: 'User not found'});
                }
                if (!user.isValidPassword(password)) {
                    return done(null, false, {message: 'User not authorized'});
                }
                return done(null, user);
            })
            .catch(err => {
                return done(err);
            });
}));

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id ,function(err, user){
      done(err, user);
    });
});

module.exports = passport;
