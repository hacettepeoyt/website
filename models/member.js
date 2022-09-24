const mongoose = require("mongoose");


const memberSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    studentID: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    department: {
        type: String,
        required: true
    },

    mobileNumber: {
        type: String,
        required: true
    },

    groupChat: {
        type: Boolean,
        required: true
    }
})

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
