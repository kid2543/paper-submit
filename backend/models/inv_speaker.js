const mongoose = require('mongoose')
const Conferences = require('./conferences')

const invSpeakerSchema = mongoose.Schema(
    {
        name:{
            type:String,
        },
        desc:{
            type:String,
        },
        keynote:{
            type:String,
        },
        img:{
            type:String,
        },
        cv:{
            type:String,
        },
        confr_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: Conferences
        },
    }
)

const InvSpeaker = mongoose.model("inv_speaker",invSpeakerSchema)

module.exports = InvSpeaker