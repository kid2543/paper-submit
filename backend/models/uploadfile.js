const mongoose = require('mongoose')
const Conferences = require("./conferences")

const uploadSchema = mongoose.Schema(
    {
        name : {
            type: String
        },
        file: {
            type: String
        },
        confr_id : {
            type: mongoose.Schema.Types.ObjectId,
            ref: Conferences
        }
    }
)

const UploadFile = mongoose.model("Uploadfile",uploadSchema)

module.exports = UploadFile