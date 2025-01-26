const mongoose = require('mongoose')
const PaperFile = require('./paper_file')

const editPaperFileSchema = mongoose.Schema(
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
        file_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: PaperFile,
            required: true
        },
    }, { timestamps: true }
)

const editPaperFile = mongoose.model("paper_edit",editPaperFileSchema)

module.exports = editPaperFile