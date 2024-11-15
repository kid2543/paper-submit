const mongoose = require('mongoose')

const Status = {
    UNREAD: 'UNREAD',
    READ: 'READ'
}

Object.freeze(Status)

const notificationSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        title: String,
        message: String,
        status: {
            type: String,
            enum: {
                values: Object.values(Status),
                message: '{VALUE} is not supported'
            },
            default: Status.UNREAD,
        }
    }, { timestamps: true }
)

const Notification = mongoose.model("notification",notificationSchema)

module.exports = Notification