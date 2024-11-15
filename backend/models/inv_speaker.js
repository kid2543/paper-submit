const mongoose = require('mongoose')
const Conferences = require('./conferences')

const invSpeakerSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required: true
        },
        desc:{
            type:String,
            required: true
        },
        keynote:{
            type:String,
            required: true
        },
        img:{
            type:String,
        },
        cv:{
            type:String,
        },
        confr_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: Conferences,
            required: true
        },
    }
)

const InvSpeaker = mongoose.model("inv_speaker",invSpeakerSchema)

module.exports = InvSpeaker