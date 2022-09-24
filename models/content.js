const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// TODO add default images for projects, courses and events.

const faqSchema = new Schema({
    question: {
        type: String,
        required: true
    },

    answer: {
        type: String,
        required: true
    }
});

const projectSchema = new Schema({
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

const courseSchema = new Schema({
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

const eventSchema = new Schema({
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

const Faq = mongoose.model('Faq', faqSchema);
const Project = mongoose.model('Project', projectSchema);
const Course = mongoose.model('Course', courseSchema);
const Event = mongoose.model('Event', eventSchema);

module.exports = {
    Faq,
    Project,
    Course,
    Event
}
