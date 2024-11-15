const express = require('express')

//midlewares
const requireHost = require('../middlewares/requireHost')

// controller
const { createCategory, listReviewer } = require('../controllers/categoryController')

const router = express.Router()

// create category
router.post('/', requireHost, createCategory)

// list reviwer
router.patch('/', requireHost, listReviewer)

module.exports = router

