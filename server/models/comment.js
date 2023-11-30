const mongoose = require('mongoose')

const commentSchema = mongoose.Schema(
    {
        owner : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'committees'
        },

        detail: {
            type:String,
            required: true
        },

        comment_file: {
            type: String
        }
    }
)

const Comment = mongoose.model("comment",commentSchema)

module.exports = Comment