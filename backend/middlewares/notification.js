const Notification = require('../models/notification')

function createNotification(user_id, title, message) {
    const notification = new Notification({user_id, title, message})
    return notification.save()
}

module.exports = {
    createNotification
}