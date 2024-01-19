const mongoose = require('mongoose')

const categorySchema = mongoose.Schema(
    {
        category_code : {
            type: String,
            required: true
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
        },
        confr_code : {
            type: String,
            required : true
        },
        topic : {
            type : String,
            required:true
        }
    }
)

const Category = mongoose.model("category",categorySchema)

module.exports = Category