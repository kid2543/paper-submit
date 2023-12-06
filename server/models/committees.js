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
            required: true,
            min: [10, 'Must be at least 10,got {VALUE}']
        },
        add_by:{type:mongoose.Schema.Types.ObjectId,ref:'host'},
        confr_code:String
    }
)

const Committee = mongoose.model("committee",committeeSchema)

module.exports = Committee