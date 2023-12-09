const mongoose = require('mongoose')

const authorSchema = mongoose.Schema(
    {
        tname:{
            type:Number,
            required:true
        },
        fname : {
            type: String,
            required: true
        },

        lname: {
            type:String,
            required: true
        },

        username: {
            type: String,
            required:true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    }
)

const Author = mongoose.model("author",authorSchema)

module.exports = Author