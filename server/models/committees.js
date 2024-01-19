const mongoose = require('mongoose')

const committeeSchema = mongoose.Schema(
    {
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
        },
        add_by:{
            type:String,
            required: true
        },
        topic:[String],
    }
)

const Committee = mongoose.model("committee",committeeSchema)

module.exports = Committee