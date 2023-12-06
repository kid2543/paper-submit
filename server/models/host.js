const mongoose = require('mongoose')

const hostSchema = mongoose.Schema(
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
        }
    }
)

const Host = mongoose.model("host",hostSchema)

module.exports = Host