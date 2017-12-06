const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const coordsSchema = Schema({
    campus: {
        type: Schema.Types.ObjectId,
        ref : "Campus",
        required: true
    },
    center : {
        lat : {
            type : Number,
            required : true
        },
        lng : {
            type : Number,
            required : true
        }
    },
    coords : {
        type : [{
            lat : Number,
            lng : Number
        }],
        required: true
    }
}, {collection : 'coords'});

coordsSchema.statics.getByCampus = function (campusId) {
    return this.findOne({ campus: campusId }).exec(function (coords) {
        return coords;
    });
};


module.exports = mongoose.model("Coordinations", coordsSchema);

