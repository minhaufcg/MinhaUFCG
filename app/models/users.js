const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = Schema({
    name: {type: String, require: true},
    role: {
        type: String, 
        enum: ["student", "teacher", "servant", "admin"],
        require: true
    },
    registration: {type: String, require: true},
    password: {type: String, require: true}
});

userSchema.statics.getByRegistration = function (registration) {
    console.log(registration);
    return this.find({registration : registration}).exec(function (user) {
        return user;
    });
};

module.exports = mongoose.model("User", userSchema);
