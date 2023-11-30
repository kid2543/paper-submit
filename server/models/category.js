const mongoose = require('mongoose')

const categorySchema = mongoose.Schema(
    {
        c_code : {
            type: String,
            require: true,
            unique: true
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
        }
    }
)

const Category = mongoose.model("category",categorySchema)

module.exports = Category