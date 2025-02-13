const mongoose = require("mongoose");
const Publication = require("./publication")
const User = require("./user")
const fs = require('fs')

const conferencesSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  sub_title: { type: String },
  confr_code: { type: String, required: true, unique: true },
  confr_desc: [{ type: String }],
  important_date: [{ date_name: { type: String }, start_date: { type: Date }, end_date: { type: Date } }],
  schedule: String,
  publication: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: Publication
  }],
  submit_detail: [{
    type: String,
  }],
  logo: { type: String },
  guide_for_presenter: [String],
  guide_for_chair: [String],
  guide_for_audience: [String],
  presentation_guideline: [String],
  presentation_remark: { type: String },
  regis_eb_start_date: { type: Date },
  regis_eb_end_date: { type: Date },
  regis_rl_start_date: { type: Date },
  regis_rl_end_date: { type: Date },
  bank_name: { type: String },
  acc_name: { type: String },
  bank_type: { type: String },
  acc_no: { type: String },
  regis_type: [{ name: String, price_1: { type: String }, price_2: { type: String } }],
  venue: { name: { type: String }, desc: [{ type: String }], remark: { type: String } },
  venue_image: { type: String },
  confr_start_date: {
    type: Date,
    default: Date.now(),
    required: true
  },
  confr_end_date: {
    type: Date,
    required: true
  },
  status: { type: Boolean, default: false },
  question: [String],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  tag: [String],
  cate: {
    type: String,
    enum: {
      values: Object.values(['การประชุมวิชาการระดับชาติ', 'การประชุมวิชาการระดับนานาชาติ', 'การประชุมวิชาการเฉพาะทาง', 'การประชุมวิชาการประจำปี'])
    }
  }
});

conferencesSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
  try {
    const inv = await mongoose.model('inv_speaker').find({ confr_id: this._id })

    // delete file before delete inv
    if (inv.length > 0) {
      for (const file of inv) {
        if (file.img)
          fs.unlink(`public/uploads/${file.img}`, (err) => {
            if(err) {
              console.log('ลบรูปพิธีกรไม่สำเร็จ',err)
            } else {
              console.log('ลบรูปพิธีกรแล้ว')
            }
          })
        if (file.cv)
          fs.unlink(`public/uploads/${file.cv}`, (err) => {
            if(err) {
              console.log('ลบ cv ไม่สำเร็จ',err)
            } else {
              console.log("ลบ cv แล้ว")
            }
          })
      }
    }

    // delete inv
    await mongoose.model('inv_speaker').deleteMany({ confr_id: this._id })

    // delete template
    const template = await mongoose.model('Template').find({confr_id: this._id})
    if(template.length > 0) {
      for(const file of template) {
        fs.unlink(`public/uploads/${file.file}`, (err) => {
          if(err) {
            console.log('ลบไฟล์ template error',err)
          } else {
            console.log('ลบเทรมเพลตแล้ว')
          }
        })
      }
    }
    
    await mongoose.model('Template').deleteMany({confr_id : this._id})
    

    // delete category
    await mongoose.model('category').deleteMany({confr_id: this._id})

    // delete partner
    const partner = await mongoose.model('partner').find({confr_id: this._id})
    if(partner.length > 0) {
      for(const file of partner) {
        fs.unlinkSync(`public/uploads/${file.image}`, (err) => {
          if(err) {
            console.log('ลบรูป partner ไม่สำเร็จ',err)
          } else {
            console.log('ลบผู้สนับสนุนแล้ว')
          }
        })
      }
    }

    await mongoose.model('partner').deleteMany({confr_id: this._id})

  } catch (error) {
    next(error)
  }
})

const Conferences = mongoose.model("conferences", conferencesSchema);

module.exports = Conferences;
