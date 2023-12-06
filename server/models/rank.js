const mongoose = require('mongoose')

const rankSchema = mongoose.Schema(
    {
        rank_code:{type:Number,required:true,unique:true},
        name:{type:String,required:true}
    }
)

const Rank = mongoose.model("rank",rankSchema)

module.exports = Rank