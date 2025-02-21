const express = require('express')

// middelwares

// controllers
const { createPublication, getPublication, updatePublication, deletePublication, searchPublication, getPublicationForConfr } = require('../controllers/publication_controller')
const verifyToken = require('../middlewares/VerifyToken')
const checkRole = require('../middlewares/checkRole')

// routes
const router = express.Router()

// create pub
router.post('/', verifyToken, checkRole(['ADMIN', 'HOST']), createPublication)

// read pub
router.get('/', verifyToken, checkRole(['ADMIN']), getPublication)

router.get('/confr/:id', getPublicationForConfr)

// update pub
router.patch('/:id', verifyToken, checkRole(['ADMIN', 'HOST']), updatePublication)

// delete pub
router.delete('/:id', verifyToken, checkRole(['ADMIN', 'HOST']), deletePublication)

// search pub
router.get('/search', verifyToken, checkRole(['ADMIN', 'HOST']), searchPublication)



module.exports = router