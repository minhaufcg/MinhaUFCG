var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var requestSchema = Schema({
    author: {
        type: Schema.Types.ObjectId, 
        ref: "User", 
        required: true
    },
    description: {type: String, required: true},
    status: {
        type: String, 
        "default": "pending", 
        enum: ["pending", "in progress", "done"]
    },
    priority: {
        type: String, 
        required: true, 
        enum: ["high", "medium", "low"]
    },
    category: {
        type: String, 
        required: true, 
        enum: ["restauração de patrimônio", "adição de novo recurso", "reforço de vigilânica", "reposição de recurso", "reparação de recurso em mal funcionamento", "reabastecimento de recurso", "limpeza de ambiente", "reformulação de ambiente"]
    },
    coords: {type: [Number], index: "2dsphere"}, // [longitude, latitude]
    createdOn: {type: Date, "default": Date.now}
});

mongoose.model("Request", requestSchema);
