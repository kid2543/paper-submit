const mongoose = require('mongoose')

const paperSchema = mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },
        comment:[{type:mongoose.Schema.Types.ObjectId,ref:'commnet'}],
        confr_code:String,
        file:String,
        category_name:[String],
        owner:String,
        keyword:[String],
        stauts:Number,
        rank:Number,
        committees:[String]
    }
)

const Paper = mongoose.model("paper",paperSchema)

module.exports = Paper