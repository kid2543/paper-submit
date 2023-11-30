const mongoose = require('mongoose')

const uploadSchema = mongoose.Schema(
    {
        image : {
            type: String
        }
    }
)

const UploadFile = mongoose.model("Uploadfile",uploadSchema)

module.exports = UploadFile