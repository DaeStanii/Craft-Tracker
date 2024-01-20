const { Schema, model } = require('mongoose');

const materialSchema = new Schema({
    materialLabel: {
        type: String,
        required: true,
        trim: true,
    },
    material: {
        type: String,
        required: true,
        trim: true,
    },
})

const Material = model('Material', materialSchema)

module.exports = Material;