const mongoose = require('mongoose')
const Conferences = require('./conferences')
const User = require('./user')

const categorySchema = mongoose.Schema(
    {
        category_code : {
            type: String,
            required: true,
        },
        name: {
            type:String,
            required: true
        },
        icon: {
            type: String
        },
        desc: {
            type: String
        },
        confr_id : {
            type: mongoose.Schema.Types.ObjectId,
            ref: Conferences,
            required : true
        },
        reviewer_list: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: User
            }
        ],
    }
)

categorySchema.index({confr_id: 1, name: 'text'})

const Category = mongoose.model("category",categorySchema)

module.exports = Category