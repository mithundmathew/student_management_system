const mongoose = require('mongoose')

const { Schema, model } = mongoose
const branchSchema = new Schema(
    {
        branch: {
            type: String,
            required: true

        },



    },
    {
        timestamps: true,
    }
)
module.exports = mongoose.model('branch', branchSchema)