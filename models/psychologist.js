const mongoose = require('mongoose');

const psychologistSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    surname: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Psychologist', psychologistSchema)
