const express = require('express')

//midlewares
const requireHost = require('../middlewares/requireHost')

// controller
const { createConference, editConference, allConference, openConference } = require('../controllers/confrController')

const router = express.Router()

//create conference
router.post('/', requireHost, createConference)

//edit conference
router.patch('/', requireHost, editConference)

//get all
router.get('/all', requireHost, allConference)

//get open conference
router.get('/', openConference)


module.exports = router

