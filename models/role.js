const mongoose = require('mongoose');
const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 50
    },
    createDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('role', roleSchema);