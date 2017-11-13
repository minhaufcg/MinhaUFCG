const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const requestSchema = Schema({
    author: {
        type: Schema.Types.ObjectId, 
        ref: "User", 
        required: true
    },
    description: {
        type: String, 
        required: true
    },
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
    coords: {
        type: [Number], // [longitude, latitude]
        index: "2dsphere"
    }, 
    createdOn: {
        type: Date, 
        "default": Date.now
    }
});

mongoose.model("Request", requestSchema);
