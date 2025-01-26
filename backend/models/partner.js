const mongoose = require('mongoose')
const Conferences = require('./conferences')

const partnerSchema = mongoose.Schema(
    {
        confr_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Conferences
        },
        image: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            required: true
        },
    }
)

const Partner = mongoose.model("partner",partnerSchema)

module.exports = Partner