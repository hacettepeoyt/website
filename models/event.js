const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
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

    location: {
        type: String,
        required: true
    },

    time: {
        type: String,
        required: true
    },

    date: {
        type: String,
        required: true
    },

    duration: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Event', eventSchema);
