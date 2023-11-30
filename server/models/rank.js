const mongoose = require('mongoose')

const rankSchema = mongoose.Schema(
    {
        rank_code:{type:Number,require:true,unique:true},
        name:{type:String,require:true}
    }
)

const Rank = mongoose.model("rank",rankSchema)

module.exports = Rank