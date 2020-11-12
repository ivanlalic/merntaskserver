const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now()
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project' //same name as the Project.js un models
    }
});

module.exports = mongoose.model('Task', TaskSchema);