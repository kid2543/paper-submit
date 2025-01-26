const express = require('express')

// middlewares
const verifyToken = require('../middlewares/VerifyToken')

// controllers
const { getAllNotification, readNotification, clearNotification } = require('../controllers/notification_controller')

const router = express.Router()

// get all notification
router.get('/', verifyToken, getAllNotification)

// read all notification
router.patch('/read', verifyToken, readNotification)

// Clear all
router.delete('/', verifyToken, clearNotification)

module.exports = router