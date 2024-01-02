const mongoose = require("mongoose");

const conferencesSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  confr_code: { type: String, required: true , unique: true },
  confr_desc: {type:String},
  important_date: [{ name: {type:String}, date: { type: Date } }],
  schedule: {type:String},
  publication: [String],
  partner: [{type:String}],
  logo: {type:String},
  brochure: {type:String},
  presentation_guide: { header: {type:String}, detail: [{type:String}], remark: {type:String} },
  regis: {
    remark: {type:String},
    early_bird_date: {type:Date},
    regular_date: {type:Date},
    bank_name: {type:String},
    ac_name: {type:String},
    ac_type: {type:String},
    ac_no: { type: String },
    regis_type: [{ name: String, price_1: {type:Number}, price_2:{type:Number} }],
  },
  venue: { name: {type:String}, desc: {type:String}, remark:{type:String}, img: {type:String}, travel: {type:String} },
  category_code: [{type:String}],
  owner: {type:String},
});

const Conferences = mongoose.model("conferences", conferencesSchema);

module.exports = Conferences;
