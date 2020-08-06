const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        min: 2,
        required: true,

    },
    lastName: {
        type: String,
        min: 2,
        required: true,

    },
    email: {
        type: String,
        required: true,
        min: 6

    },
    password: {
        type: String,
        required: true,
        unique: true,
        max: 255,
        min: 8

    },
    confirmPassword: {
        type: String,
        required: true,
        unique: true,
        min: 8,
        max: 255

    },
    role: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        min: 10,
        max: 14,

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
        max: 255

    },
    address2: {
        type: String,
        required: true,
        max: 255

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