const express = require('express')

// middlewares
const verifyToken = require('../middlewares/VerifyToken')
const checkRole = require('../middlewares/checkRole')
const uploadImage = require('../middlewares/uploadImage')

// controllers
const { createPartner, deletePartner, getPartner } = require('../controllers/partner_controller')

const router = express.Router()

// create partner
router.post('/', verifyToken, checkRole(['HOST', 'ADMIN']), uploadImage.single('image'), createPartner)

// delete partner
router.delete('/:id', verifyToken, checkRole(['HOST', 'ADMIN']), deletePartner)

// read partner
router.get('/:id', getPartner)


module.exports = router