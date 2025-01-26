const express = require('express')


// middelwares
const requireAdmin = require('../middlewares/requireAdmin')
const requireHost = require('../middlewares/requireHost')

// controllers
const { createPublication, getPublication, updatePublication, deletePublication, searchPublication } = require('../controllers/publication_controller')
const verifyToken = require('../middlewares/VerifyToken')
const checkRole = require('../middlewares/checkRole')

// routes
const router = express.Router()

// create pub
router.post('/', verifyToken, checkRole(['ADMIN']), createPublication)

// read pub
router.get('/', verifyToken, checkRole(['HOST', 'ADMIN']), getPublication)

// update pub
router.patch('/:id', verifyToken, checkRole(['ADMIN']), updatePublication)

// delete pub
router.delete('/:id', verifyToken, checkRole(['ADMIN']), deletePublication)

// search pub
router.get('/search', verifyToken, checkRole(['ADMIN']), searchPublication)



module.exports = router