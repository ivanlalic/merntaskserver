const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    createdby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' //related to the module.exports of the User.js
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Project', ProjectSchema);