const express = require('express')

// middlewares
const verifyToken = require('../middlewares/VerifyToken')

// controllers
const {
    getAllNotification,
    readNotification,
    clearNotification,
    getConfrNotification,
    createNewNotification
} = require('../controllers/notification_controller')
const checkRole = require('../middlewares/checkRole')

const router = express.Router()

// create notification
router.post('/', verifyToken, checkRole(['ADMIN','HOST']), createNewNotification)

// get all notification
router.get('/', verifyToken, getAllNotification)

// read all notification
router.patch('/read', verifyToken, readNotification)

// conference notification
router.get('/confr/:id', getConfrNotification)

// Clear all
router.delete('/', verifyToken, clearNotification)

module.exports = router