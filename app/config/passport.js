const passport = require('passport');
const LocalStratagy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

mongoose.Promise = require('bluebird');

passport.use(new LocalStratagy({
    usernameField: 'registration'
}, function (registration, password, done) {
    User.findOne({registration: registration})
        .then(user => {
            if(!user) {
                return done(null, false,{message: 'User not found'});
            }
            if (!user.verifyPassword(password)) {
                return done(null, false, {message: 'Password is wrong'});
            }
            return done(null, user);
        })
        .catch(err => {
            return done(err);
        });
}));
