const mongoose = require('mongoose')

const paperSchema = mongoose.Schema(
    {
        name: String,
        acdm_position: String,
        mm_position: String,
        teacher: String,
        faculty: String,
        university: String,
        free_w_position: String,
        aff_agencie: String,
        paper_code: String,
        confr_code: String,
        paper_type:String,
        th_paper_title: String,
        en_paper_title: String,
        th_keyword: String,
        en_keyword: String,
        th_author_name: String,
        en_author_name: String,
        address: String,
        email: String,
        paper_file: String,
        create_date: Date,
        owner: String,
    }
)

const Paper = mongoose.model("paper",paperSchema)

module.exports = Paper