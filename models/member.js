const mongoose = require("mongoose");


const memberSchema = new mongoose.Schema({
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

    degree: {
        type: String,
        enum: ["Hazırlık", "1. Sınıf", "2. Sınıf", "3. Sınıf", "4. Sınıf", "Yüksek Lisans", "Doktora", "Diğer"],
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
        enum: ["Signal", "Telegram", "WhatsApp", "-"],
        required: true
    }
})

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
