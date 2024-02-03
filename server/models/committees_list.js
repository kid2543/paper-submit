const mongoose = require('mongoose')

const committeesListSchema = mongoose.Schema(
    {
        confr_code:String,
        committees_list:[String],
        paper_id:String,
    }
)

const ListOfCommittees = mongoose.model("committees_list",committeesListSchema)

module.exports = ListOfCommittees