const mongoose = require('mongoose')

const paperSchema = mongoose.Schema(
    {
        title:String,
        paper_code:String,
        author_name:String,
        file:String,
        submit_code:String,
        owner:String,
        keyword:[String],
        stauts:Number,
        rank:Number,
    }
)

const Paper = mongoose.model("paper",paperSchema)

module.exports = Paper