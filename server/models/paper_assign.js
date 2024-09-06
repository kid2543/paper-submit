const mongoose = require('mongoose')
const User = require("./user")
const Paper = require('./paper')

const paperAssignSchema = mongoose.Schema(
    {
        reviewer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: User
        },
        status: {
            type:Number,
            default: 0,
        },
        paper_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref : Paper
        },
        suggestion: String,
        suggestion_file: String,
        rate: [Number],
        total: Number,
        result: Number,
    }
)

const paperAssign = mongoose.model("paper_assign",paperAssignSchema)

module.exports = paperAssign