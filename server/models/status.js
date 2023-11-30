const mongoose = require('mongoose')

const statusSchema = mongoose.Schema(
    {
        status_code:{type:Number,require:true,unique:true},
        name:{type:String,require:true}
    }
)

const Status = mongoose.model("status",statusSchema)

module.exports = Status