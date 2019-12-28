const mongoose = require('mongoose');

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
        required: true
    },
    specializations: {
        type: Array
    }
})

module.exports = mongoose.model('Psychologist', psychologistSchema)
