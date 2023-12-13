const mongoose = require('mongoose')

const conferencesSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        data_item: {
            confr_desc: String,
            important_date:[{name:String,date: {type:Date}}],
            schedule: [{file:String}],
            publication:[{order_number: Number, name:String}],
            inv_speaker:[{name:String, desc:String, keynote:String, cv_prof:String, img:String}],
            partner:[{img:String}],
            logo:String,
            brochure:String,
            comittees:[{name:String, location:String}],
            presentation_guide:{header:String,detail:[String],remark:String},
            regis:{remark:String,final_date:[Date],bank_name:String,ac_name:String,ac_type:String,ac_no:{type:Number, max:10},regis_type:[{name:String,price:[Number]}]},
            venue:{name:String,img:String,travel:String}
        },
        confr_code:{type:String, required: true},
        category_code:[String],
        owner:String
    }
)

const Conferences = mongoose.model("conferences",conferencesSchema)

module.exports = Conferences