const express = require('express')

// middlewares
const requireHost = require('../middlewares/requireHost')
const uploadImage = require('../middlewares/uploadImage')
const uploadPdf = require('../middlewares/uploadFile')

// controllers
const { createInv, updateInv, uploadInvImage, uploadInvCv, deleteImage, deleteCv, removeInv } = require('../controllers/speakerController')
const {checkInvImageUpload, checkInvCvUpload} = require('../middlewares/checkUploadInvImage')

const router = express.Router()

// create inv
router.post('/', requireHost, createInv)

// update inv
router.patch('/:id', requireHost, updateInv)

// upload inv image
router.patch('/img/:id', requireHost, checkInvImageUpload, uploadImage.single('image'), uploadInvImage)

// upload inv cv
router.patch('/cv/:id', requireHost, checkInvCvUpload, uploadPdf.single('file'), uploadInvCv)

// remove image
router.patch('/remove/img/:id', requireHost, deleteImage)

// remove cv
router.patch('/remove/cv/:id', requireHost, deleteCv)


// delete inv
router.delete('/:id', requireHost, removeInv)


module.exports = router