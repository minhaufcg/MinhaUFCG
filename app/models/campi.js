const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const campusSchema = Schema({
    name: {
        type: String,
        required: true
    }
}, {collection : 'campi'});

module.exports = mongoose.model("Campus", campusSchema);