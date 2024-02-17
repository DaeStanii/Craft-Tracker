const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat')

const projectSchema = new Schema({
    projectType: {
        type: String,
        required: true,
        trim: true,
    },
    projectTitle: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    projectAuthor: {
        type: String,
        required: true,
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
                trim: true,
            },
            materialDetail: {
                type: String,
                required: true,
                trim: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
                get: (timestamp) => dateFormat(timestamp),
            }
        }
    ],
    comments: [
        {
            commentText: {
                type: String,
                required: true,
                minlength: 1,
                maxlength: 280,
            },
            commentAuthor: {
                type: String,
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
                get: (timestamp) => dateFormat(timestamp),
            },
        },
    ],
});

const Project = model('Project', projectSchema);

module.exports = Project;