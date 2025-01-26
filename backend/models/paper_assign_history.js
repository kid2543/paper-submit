const mongoose = require('mongoose')
const paperAssign = require("./paper_assign")

const Status = {
    PENDING: 'PENDING',
    SUCCESS: 'SUCCESS',
    CANCEL: 'CANCEL'
}

const Result = {
    PENDING: 'PENDING',
    ACCEPT: 'ACCEPT',
    REVISION: 'REVISE',
    REJECT: 'REJECT'
}

Object.freeze(Status)
Object.freeze(Result)

const paperAssignHistorySchema = mongoose.Schema(
    {
        status: {
            type: String,
            enum: {
                values: Object.values(Status),
                message: '{VALUE} is not supported'
            },
            default: Status.PENDING,
        },
        review_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref : paperAssign,
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

const paperAssignHistory = mongoose.model("paper_assign_history",paperAssignHistorySchema)

module.exports = paperAssignHistory