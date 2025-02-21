const mongoose = require('mongoose')
const Conference = require('../models/conferences')

const pubSchema = mongoose.Schema(
    {
        th_name: {
            type: String,
            required: true
        },
        en_name: {
            type: String,
            required: true
        },
        desc: [String],
        confr_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Conference,
            required: true
        }
    }
)

pubSchema.index({th_name: "text"})

const Publication = mongoose.model("publication",pubSchema)

module.exports = Publication