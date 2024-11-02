const mongoose = require('mongoose')
const User = require('./user')
const Publication = require('./publication')
const Conferences = require('./conferences')
const Category = require("./category")

const paperSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        paper_code: String,
        cate_code: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Category
        },
        confr_code: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Conferences
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: User
        },
        create_date: {
            type: Date,
            default: Date.now()
        },
        status:{
            type: Number,
            default: 0
        },
        result: {
            type: Number,
            default: 0
        },
        paper_file: String,
        publication: {
            type:mongoose.Schema.Types.ObjectId,
            ref: Publication
        },
        abstract: {
            type: Boolean,
            default: false
        },
        regis_type: {
            type: String
        },
        payment_status: {
            type: Number,
            default: 0
        },
        payment_image: {
            type: String
        },
        close_name_file: {
            type: String
        }
    }
)

paperSchema.index({confr_code: 1, title: 'text'})

const Paper = mongoose.model("paper",paperSchema)

module.exports = Paper