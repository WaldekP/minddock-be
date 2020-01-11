const mongoose = require('mongoose');

const Schema = mongoose.Schema

const psychologistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true,
    },
    password: {
        type: String,
        required: true,
    },
    specializations: {
        type: [String]
    },
    education: {
        school: [{
            schoolId: {
                type: mongoose.Schema.Types.ObjectId,
                // type: String,
            },
            schoolName: {
                type: String,
            }
        }],
        certificates: [String],
        awards: [String]
    },
    admin: {
        type: Boolean,
        required: true,
    }
})

module.exports = mongoose.model('Psychologist', psychologistSchema)
