const mongoose = require('mongoose')
const User = require('./user')
const Publication = require('./publication')
const Conferences = require('./conferences')
const Category = require("./category")


// status
const Status = {
    PENDING: 'PENDING',
    REVIEW: 'REVIEW',
    SUCCESS: 'SUCCESS',
    CANCEL: 'CANCEL'
}

// result status
const Result = {
    PENDING: 'PENDING',
    ACCECPT: 'ACCECPT',
    REVISE: 'REVISE',
    REJECT: 'REJECT'
}

// payment status
const Payment = {
    NEW: 'NEW',
    PENDING: 'PENDING',
    CHECKING: 'CHECKING',
    ACCECPT: 'ACCECPT',
    REJECT: 'REJECT'
}

Object.freeze(Status)
Object.freeze(Result)
Object.freeze(Payment)

const paperSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        paper_code: {
            type: String,
            required: true,
            unique: true
        },
        cate_code: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Category,
            required: true
        },
        confr_code: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Conferences,
            required: true
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: User,
            required: true
        },
        create_date: {
            type: Date,
            default: Date.now()
        },
        status:{
            type: String,
            enum: {
                values: Object.values(Status),
                message: '{VALUE} is not supported'
            },
            default: Status.PENDING
        },
        result: {
            type: String,
            enum: {
                values: Object.values(Result),
                message: '{VALUE} is not supperted'
            },
            default: Result.PENDING
        },
        paper_file: {
            type: String,
            required: true
        },
        publication: {
            type:mongoose.Schema.Types.ObjectId,
            ref: Publication,
        },
        abstract: {
            type: Boolean,
            default: false
        },
        regis_type: {
            type: Boolean,
            required: true
        },
        payment_status: {
            type: String,
            enum: {
                values: Object.values(Payment),
                message: '{VALUE} is not supported'
            },
            default: Payment.NEW
        },
        payment_image: {
            type: String
        },
        close_name_file: {
            type: String
        },
        edit_paper: [{
            type: String
        }],
        edit_deadline: {
            type: String
        },
        author: {
            type: String
        },
        address: {
            type: String
        },
        contact: {
            type: String,
        }
    }
)

paperSchema.index({confr_code: 1, title: 'text'})

paperSchema.post('update', function(doc) {
    console.log(`Notification: User ${doc.username}`)
})

const Paper = mongoose.model("paper",paperSchema)

module.exports = Paper