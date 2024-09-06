const mongoose = require('mongoose')

const pubSchema = mongoose.Schema(
    {
        th_name: String,
        en_name: String,
        branch: String,
    }
)

pubSchema.index({th_name: "text"})

const Publication = mongoose.model("publication",pubSchema)

module.exports = Publication