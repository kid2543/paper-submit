const express = require('express')

//midlewares
const requireHost = require('../middlewares/requireHost')

// controller
const { createCategory, listReviewer, getCateforConfr, getOneCategory, updateCategory, deleteCategory } = require('../controllers/category_controller')
const verifyToken = require('../middlewares/VerifyToken')
const checkRole = require('../middlewares/checkRole')

const router = express.Router()

// create category
router.post('/', verifyToken, checkRole(['HOST', 'ADMIN']), createCategory)

// list reviwer
router.patch('/review', verifyToken, checkRole(['HOST', 'ADMIN']), listReviewer)

// read
router.get('/:id', getCateforConfr)

// read one cate
router.get('/one/:id', verifyToken, checkRole(['HOST', 'ADMIN']), getOneCategory)

// update
router.patch('/update/:id', verifyToken, checkRole(['HOST', 'ADMIN']), updateCategory)

// delete category
router.delete('/:id', verifyToken, checkRole(['HOST', 'ADMIN']), deleteCategory)


module.exports = router

