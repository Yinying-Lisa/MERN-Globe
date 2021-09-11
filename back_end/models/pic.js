const mongoose = require("mongoose");

const picSchema = new mongoose.Schema({
    id : {
        type : Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    },
    value : {
        type: Number,
        required: true
    },
    url: {
        type: String,
        required: true
    }
});

const Pic = mongoose.model("pic", picSchema);

module.exports = Pic;