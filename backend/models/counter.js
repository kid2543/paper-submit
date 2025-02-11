const mongoose = require('mongoose')

const counterSchema = mongoose.Schema({
    _id: String,
    sequence_value : Number
})

const Counters = mongoose.model('counter', counterSchema)

module.exports = Counters