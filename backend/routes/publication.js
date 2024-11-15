const express = require('express')


// middelwares
const requireAdmin = require('../middlewares/requireAdmin')
const requireHost = require('../middlewares/requireHost')

// controllers
const { createPublication, getPublication, updatePublication, deletePublication } = require('../controllers/publicationController')

// routes
const router = express.Router()

// create pub
router.post('/', requireAdmin, createPublication)

// read pub
router.get('/', requireHost, getPublication)

// update pub
router.patch('/:id', requireAdmin, updatePublication)

// delete pub
router.delete('/:id', requireAdmin, deletePublication)


module.exports = router