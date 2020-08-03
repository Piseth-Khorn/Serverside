const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,

    },
    lastName: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,

    },
    password: {
        type: String,
        required: true,
        unique: true

    },
    confirmPassword: {
        type: String,
        required: true,
        unique: true

    },
    role: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,

    },
    gender: {
        type: String,
        required: true,

    },
    dateOfBirth: {
        type: Date,
        required: true,

    },
    address1: {
        type: String,
        required: true,

    },
    address2: {
        type: String,
        required: true,

    },
    city: {
        type: String,
        required: true,

    },
    state: {
        type: String,
        required: true,

    },
    zipcode: {
        type: String,


    },
    file: {
        type: String,

    },



});
module.exports = mongoose.model('User', userSchema);