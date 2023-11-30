const mongoose = require('mongoose')

const hostSchema = mongoose.Schema(
    {
        fname : {
            type: String,
            require: true
        },

        lname: {
            type:String,
            required: true
        },

        username: {
            type: String,
            require:true,
            unique: true
        },
        password: {
            type: String,
            require: true,
            min: [10, 'Must be at least 10,got {VALUE}']
        }
    }
)

const Host = mongoose.model("host",hostSchema)

module.exports = Host