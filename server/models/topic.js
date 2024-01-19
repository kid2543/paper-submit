const mongoose = require('mongoose')

const topicSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            unique:true
        },
    }
)

const Topic = mongoose.model("topic",topicSchema)

module.exports = Topic