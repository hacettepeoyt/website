const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    img: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    status: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },

    repository: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Project', projectSchema);
