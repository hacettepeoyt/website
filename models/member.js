const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const memberSchema = new Schema({
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
        type: String,
        required: true
    }
})

module.exports = {
    memberSchema
};
