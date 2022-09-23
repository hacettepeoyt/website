const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// This is a draft for beginning, all fields will be decided later on.

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
    }
})

module.exports = {
    memberSchema
};
