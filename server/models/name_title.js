const mongoose = require('mongoose')

const nameTitleSchema = mongoose.Schema(
    {
        id:{
            type:Number,
            required:true,
            unique:true
        },
        name:{
            type:String,
            require:true
        }
    }
)

const Name_title = mongoose.model("name_title",nameTitleSchema)

module.exports = Name_title