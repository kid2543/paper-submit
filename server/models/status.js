const mongoose = require('mongoose')

const statusSchema = mongoose.Schema(
    {
        status_code:{type:Number,required:true,unique:true},
        name:{type:String,required:true}
    }
)

const Status = mongoose.model("status",statusSchema)

module.exports = Status