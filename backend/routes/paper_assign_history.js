const express = require('express')

//midlewares
const verifyToken = require('../middlewares/VerifyToken')
const checkRole = require('../middlewares/checkRole')

// controller
const { readHistory } = require('../controllers/paper_assign_history_controller')

const router = express.Router()

// read assign history
router.get('/read/:id', verifyToken, readHistory)



module.exports = router

