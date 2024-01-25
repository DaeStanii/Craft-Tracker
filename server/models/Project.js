const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat')

const projectSchema = new Schema({
    projectTitle: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp)
    },
    materials: [
        {
            materialLabel: {
                type: String,
                required: true,
                minlength: 1,
            },
            materialDetail: {
                type: String,
                required: true,
                minlength: 1,
            },
            createdAt: {
                type: Date,
                default: Date.now,
                get: (timestamp) => dateFormat(timestamp),
            }
        }
    ]
})

const Project = model('Project', projectSchema);

module.exports = Project;