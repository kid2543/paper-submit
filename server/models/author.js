const mongoose = require('mongoose')

const authorSchema = mongoose.Schema(
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

const Author = mongoose.model("author",authorSchema)

module.exports = Author