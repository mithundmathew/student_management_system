const mongoose = require('mongoose')

const { Schema, model } = mongoose
const adminSchema = new Schema(
    {
        email: {
            type: String,
            required: true

        },
       
        password: {
            type: String,
            required: true

        },

    },
    {
        timestamps: true,
    }
)
module.exports = mongoose.model('admin', adminSchema)