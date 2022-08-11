const mongoose = require('mongoose')

const { Schema, model } = mongoose
const studentSchema = new Schema(
    {
        name: {
            type: String,
            // required: true

        },
        address: {
            type: String,
            // required: true
        },
        // gender: {
        //     type: String,
        //     required: true
        // },

        dob: {
            type: String,
            // required: true

        },
        phno: {
            type: Number,
            max: 9999999999,
            min: 1000000000,
            // required: true

        },
        email: {
            type: String,
            lowercase: true,
            // unique: true
        },
        // password: {
        //     type: String,
        //     required: true

        // },
        image: {
            type: String,
            // required: true
        }

    },
    {
        timestamps: true,
    }
)
module.exports = mongoose.model('students', studentSchema)