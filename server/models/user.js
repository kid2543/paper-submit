const mongoose = require('mongoose')
const Conferences = require("../models/conferences")

const userSchema = mongoose.Schema(
    {
        prefix: {
            type: String,
        },
        fname: {
            type: String,
        },
        lname: {
            type:String,
        },
        status: {
            type: String,
        },
        phone: {
            type: String,
        },
        gender: {
            type: String,
        },
        role: {
            type: String,
        },
        username: {
            type: String,
            unique: true
        },
        password: {
            type: String,
        },
        email: {
            type:String,
        },
        department: {
            type:String,
        },
        university: {
            type: String,
        },
        address: {
            type: String,
        },
        province: {
            type:String,
        },
        district: {
            type:String,
        },
        sub_district: {
            type:String,
        },
        zip_code: {
            type:String,
        },
        confr_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Conferences
        },
    }
)

userSchema.index({fname: 'text', lname: 'text'})

const User = mongoose.model("User", userSchema)

module.exports = User