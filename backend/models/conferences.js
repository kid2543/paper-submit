const mongoose = require("mongoose");
const Publication = require("./publication")
const User = require("./user")

const conferencesSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  sub_title: { type: String },
  confr_code: { type: String, required: true, unique: true },
  confr_desc: [{type: String}],
  important_date: [{ date_name: { type: String }, start_date: { type: Date }, end_date: { type: Date } }],
  schedule: [{
    start: String,
    end: String,
    items: [String]
  }],
  publication: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: Publication
  }],
  submit_detail: [{
    type: String,
  }],
  logo: { type: String },
  brochure: { type: String },
  guide_for_presenter: [String],
  guide_for_chair: [String],
  guide_for_audience: [String],
  presentation_guideline: [String],
  presentation_remark: { type: String },
  committees: [{ name: String, belong_to: String, position: String, }],
  regis_eb_start_date: { type: Date },
  regis_eb_end_date: { type: Date },
  regis_rl_start_date: { type: Date },
  regis_rl_end_date: { type: Date },
  bank_name: { type: String },
  acc_name: { type: String },
  bank_type: { type: String },
  acc_no: { type: String },
  regis_type: [{ name: String, price_1: { type: String }, price_2: { type: String } }],
  venue: { name: { type: String }, desc: { type: String }, remark: { type: String } },
  venue_image: {type: String},
  confr_start_date: {
    type: Date,
    default: Date.now(),
    required: true
  },
  confr_end_date: {
    type: Date,
    required: true
  },
  status: {type: Boolean, default: false},
  question: [String],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true
  }
});

const Conferences = mongoose.model("conferences", conferencesSchema);

module.exports = Conferences;
