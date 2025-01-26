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
    ACCECPT: 'ACCEPT',
    REVISE: 'REVISE',
    PUBLIC: 'PUBLIC',
    REJECT: 'REJECT'
}

// payment status
const Payment = {
    NEW: 'NEW',
    PENDING: 'PENDING',
    CHECKING: 'CHECKING',
    ACCEPT: 'ACCEPT', 
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
        advise: {
            type: String,
        },
        group:{
            type: String,
        },
        university: {
            type: String,
        },
        keyword: {
            type: String,
            required: true
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
        author: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        contact: {
            type: String,
            required: true
        },
        deadline: [
            {name: {type: String}, date: {type: Date}}
        ],
        award_rate: {type: String},
        letter: {type: String},
        certificate: {type: String}
    }, { timestamps: true }
)

paperSchema.index({confr_code: 1, title: 'text'})

paperSchema.post('findByIdAndUpdate', function(doc) {
    console.log(`Notification: User ${doc.username}`)
})

paperSchema.pre('deleteOne', { document: true, query: false }, async function(next) {
    try {
        await mongoose.model('paper_assign').deleteMany({paper_id: this._id})
        next()
    } catch (error) {
        next(error)
    }
})

const Paper = mongoose.model("paper",paperSchema)

module.exports = Paper