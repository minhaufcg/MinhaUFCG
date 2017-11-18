const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const requestSchema = Schema({
    author: {
        type: Schema.Types.ObjectId, 
        ref: "User", 
        required: true
    },
    description: {type: String, required: true},
    status: {
        type: String, 
        "default": "pending", 
        enum: ["pending", "ongoing", "done"]
    },
    priority: {
        type: String, 
        required: true, 
        enum: ["high", "medium", "low"]
    },
    category: {
        type: String, 
        required: true, 
        enum: [	"property restoring",			"adding of new resource",
		"surveillance reforcement"		"resource replacement",
		"malfunctioning resource repairing", 	"resource replenishment",
		"enviroment cleaning", 			"enviroment reformulation"]
    },
    coords: {type: [Number], index: "2dsphere"}, // [longitude, latitude]
    createdOn: {type: Date, "default": Date.now}
});

requestSchema.statics.getByAuthor = function (userId) {
    return this.find({author : userId}).exec(function (requests) {
        return requests;
    });
};

module.exports = mongoose.model("Request", requestSchema);
