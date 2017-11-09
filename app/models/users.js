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

mongoose.model("User", userSchema);
