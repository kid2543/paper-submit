const mongoose = require('mongoose')

const notificationSchema = mongoose.Schema(
    {
        user_id: {
            type: String,
            required: true,
        },
        title: String,
        message: String,
        status: {
            type: Boolean,
            default: false,
        }
    }, { timestamps: true }
)

const Notification = mongoose.model("notification",notificationSchema)

module.exports = Notification