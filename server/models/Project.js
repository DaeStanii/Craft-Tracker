const { Schema, model } = require('mongoose');

const projectSchema = new Schema({
    projectTitle: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
})

const Project = model('Project', projectSchema);

module.exports = Project;