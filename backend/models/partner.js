const mongoose = require('mongoose')
const Conferences = require('./conferences')

const partnerSchema = mongoose.Schema(
    {
        confr_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Conferences
        },
        image: String,
        desc: String,
    }
)

const Partner = mongoose.model("partner",partnerSchema)

module.exports = Partner