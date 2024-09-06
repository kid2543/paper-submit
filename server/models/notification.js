const mongoose = require('mongoose')

const notificationSchema = mongoose.Schema(
    {
        owner: {
            type: String,
            required: true,
        },
        header: String,
        form: String,
        time: {
            type: Date,
            default: Date.now()
        },
        read_status: {
            type: Boolean,
            default: false,
        }
    }
)

const notification = mongoose.model("notification",notificationSchema)

module.exports = notification