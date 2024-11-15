const express = require('express')

// middleware
const requireAdmin = require('../middlewares/requireAdmin')
const requireHost = require('../middlewares/requireHost')
const requireAuth = require('../middlewares/requireAuth')

// controller
const {loginUser, signupUser, createHost, getHost, deleteUser, createCommittee, getUserNotification} = require('../controllers/userController')


const router = express.Router()

//login route
router.post('/login', loginUser)

//signup route
router.post('/signup', signupUser)

//admin create host route
router.post('/host/add', requireAdmin, createHost)

//admin get host route
router.get('/host', requireAdmin, getHost)

//create committee
router.post('/committee', requireHost, createCommittee)

//admin delete user
router.delete('/', requireAdmin, deleteUser)

// get notification
router.get('/notification', requireAuth, getUserNotification)

module.exports = router

