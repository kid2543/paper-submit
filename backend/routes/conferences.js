const express = require('express')

//midlewares
const verifyToken = require('../middlewares/VerifyToken')
const checkRole = require('../middlewares/checkRole')
const uploadImage = require('../middlewares/uploadImage')

// controller
const { 
    createConference, 
    editConference, 
    allConference, 
    openConference, 
    singleConference, 
    getConferByUser, 
    getConferenceHost, 
    uploadVenue, 
    uploadLogo, 
    getQuestion, 
    searchConference, 
    deleteConference, 
    hostSeachConference, 
    getHomeConfr, 
    getConferenceOwner
 } = require('../controllers/confr_controller')

const router = express.Router()

//create conference
router.post('/', verifyToken, checkRole(['HOST', 'ADMIN']), createConference)

//update conference
router.patch('/', verifyToken, checkRole(['HOST', 'ADMIN']), editConference)

// upload venue image
router.patch('/venue/:id', verifyToken, checkRole(['HOST', 'ADMIN']), uploadImage.single('image'),  uploadVenue)

// upload logo
router.patch('/logo/:id', verifyToken, checkRole(['HOST', 'ADMIN']), uploadImage.single('image'),  uploadLogo)

//get all
router.get('/all', verifyToken, checkRole(['HOST', 'ADMIN']), allConference)

// get conference ที่เปิดรับล่าสุด
router.get('/current', getHomeConfr)

//get open conference
router.get('/', openConference)

// single conference
router.get('/single/:id', singleConference)

// get for host
router.get('/host/:id', verifyToken, checkRole(['HOST', 'ADMIN']), getConferenceHost)

// get by host id
router.get('/owner/:id', verifyToken, checkRole(['ADMIN']), getConferenceOwner)

// read conference with owner
router.get('/owner', verifyToken, checkRole(['HOST', 'ADMIN']), getConferByUser)

// get question for committee
router.get('/question/:id', verifyToken, checkRole(['HOST', 'ADMIN', 'COMMITTEE']), getQuestion)


// search conference
router.get('/search', verifyToken, checkRole(['ADMIN']), searchConference)

// delete conference
router.delete('/delete/:id', verifyToken, checkRole(['ADMIN', 'HOST']), deleteConference)

// search conference for host
router.get('/search/host', verifyToken, checkRole(['ADMIN', 'HOST']), hostSeachConference)



module.exports = router

