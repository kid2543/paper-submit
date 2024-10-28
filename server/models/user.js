const mongoose = require('mongoose')

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
    }
)

userSchema.index({fname: 1, lname: 1})

const User = mongoose.model("User", userSchema)

module.exports = User