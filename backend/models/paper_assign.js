const mongoose = require('mongoose')
const User = require("./user")
const Paper = require('./paper')

const Status = {
    PENDING: 'PENDING',
    SUCCESS: 'SUCCESS',
    CANCEL: 'CANCEL'
}

const Result = {
    PENDING: 'PENDING',
    ACCEPT: 'ACCEPT',
    MINOR: 'MINOR',
    MAJOR: 'MAJOR',
    REJECT: 'REJECT'
}

Object.freeze(Status)
Object.freeze(Result)

const paperAssignSchema = mongoose.Schema(
    {
        reviewer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: User,
            required: true
        },
        status: {
            type: String,
            enum: {
                values: Object.values(Status),
                message: '{VALUE} is not supported'
            },
            default: Status.PENDING,
        },
        paper_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref : Paper,
            required: true
        },
        suggestion: String,
        suggestion_file: String,
        rate: [{type: Number}],
        total: {type:Number},
        result: {
            type: String,
            enum: {
                values: Object.values(Result),
                message: '{VALUE} is not supported'
            },
            default: Result.PENDING
        },
    }, { timestamps: true }
)

const paperAssign = mongoose.model("paper_assign",paperAssignSchema)

module.exports = paperAssign