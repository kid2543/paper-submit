const mongoose = require('mongoose')
const Paper = require('./paper')

const paperFileSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        original_file: {
            type: String,
            required: true,
        },
        close_name_file: {
            type: String
        },
        paper_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Paper,
            required: true
        },
        read_original: {
            type: Boolean,
            default: false
        }
    }, { timestamps: true }
)

const PaperFile = mongoose.model("paper_file",paperFileSchema)

module.exports = PaperFile