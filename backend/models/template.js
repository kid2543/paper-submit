const mongoose = require('mongoose')
const Conferences = require("./conferences")

const templateSchema = mongoose.Schema(
    {
        name : {
            type: String
        },
        file: {
            type: String,
            required: true,
        },
        confr_id : {
            type: mongoose.Schema.Types.ObjectId,
            ref: Conferences
        }
    }
)

const Template = mongoose.model("Template",templateSchema)

module.exports = Template