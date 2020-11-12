const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    register: {
        type: Date,
        default: Date.now() //this will generate a date when a user signs up
    }
});

module.exports = mongoose.model('User', UsersSchema);