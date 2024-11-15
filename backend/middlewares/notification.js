const Notification = require('../models/notification')

function createNotification(userId, title, message) {
    const notification = new Notification({userId, title, message})
    return notification.save()
}

module.exports = {
    createNotification
}