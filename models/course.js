const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
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

    preRequisite: {
        type: Array,
        default: []
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

    duration: {             // 8 hafta, 3 gün, 4 ay...
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Course', courseSchema);
