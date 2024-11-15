const express = require('express')

// middlewares
const requireHost = require('../middlewares/requireHost')
const uploadImage = require('../middlewares/uploadImage')

// controllers
const { createPartner, deletePartner } = require('../controllers/partnerController')

const router = express.Router()

// create partner
router.post('/', requireHost, uploadImage.single('image'), createPartner)

// delete partner
router.delete('/:id', requireHost, deletePartner)


module.exports = router