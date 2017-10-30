var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = Schema({
    name: {type: String, require: true},
    role: {
        type: String, 
        enum: ["student", "teacher", "servant"]
    },
    registration: {type: String, require: true}
});

mongoose.model("User", userSchema);
