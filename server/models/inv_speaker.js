const mongoose = require('mongoose')

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
        confr_code:{
            type:String,
        },
    }
)

const InvSpeaker = mongoose.model("inv_speaker",invSpeakerSchema)

module.exports = InvSpeaker