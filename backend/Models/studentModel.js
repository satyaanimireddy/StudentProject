import mongoose from 'mongoose'

let studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
    },
    course: {
        type: String,
        required: true
    },
    isQualified: {
        type: Boolean,
        required: true
    },
    address: {
        type: String,
        required: true
    }

}, { timestamps: true })

export let Student = mongoose.model('students-datas', studentSchema)