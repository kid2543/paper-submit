const express = require('express')

// middleware
const requireAuth = require('../middlewares/requireAuth')
const verifyToken = require('../middlewares/VerifyToken')

// controller
const {
    loginUser,
    signupUser,
    createHost,
    getHost,
    createCommittee,
    getCommittee,
    searchHost,
    searchComit,
    searchAuthor,
    authForNavigate,
    getOwnerDetail,
    getAll,
    adminViewUser,
    updateUser,
    userUpdateDetail,
    changePassword,
    adminDelete
} = require('../controllers/user_controller')
const checkRole = require('../middlewares/checkRole')


const router = express.Router()

// role author
router.get('/protected/author', verifyToken, checkRole(['AUTHOR', 'ADMIN']), (req, res) => {
    res.send('This is a protected route')
})

// host
router.get('/protected/host', verifyToken, checkRole(['HOST', 'ADMIN']), (req, res) => {
    res.send('This is a host protected route')
})

// committee
router.get('/protected/committee', verifyToken, checkRole(['COMMITTEE', 'ADMIN']), (req, res) => {
    res.send('This is a committee protected route')
})

// admin
router.get('/protected', verifyToken, checkRole(['ADMIN']), (req, res) => {
    res.send('This is a admin protected route')
})

// auth for navigate
router.get('/navigate', verifyToken, authForNavigate)

//login route
router.post('/login', loginUser)

//signup route
router.post('/signup', signupUser)

// logout
router.post('/logout', verifyToken, (req, res) => {
    res.clearCookie('authToken')
    res.status(200).send('Remove cookies')
})

//admin create host route
router.post('/host/add', verifyToken, checkRole(['ADMIN']), createHost)

//admin get host route
router.get('/host', verifyToken, checkRole(['ADMIN']), getHost)

//create committee
router.post('/committee', verifyToken, checkRole(['HOST', 'ADMIN']), createCommittee)

// get committee
router.get('/committee', verifyToken, checkRole(['HOST', 'ADMIN']), getCommittee)

// admin get all user
router.get('/all', verifyToken, checkRole(['ADMIN']), getAll)

// search host
router.get('/search/host', verifyToken, checkRole(['ADMIN']), searchHost)

// search Committee
router.get('/search/committee', verifyToken, checkRole(['ADMIN', 'HOST']), searchComit)

// search author
router.get('/search/author', verifyToken, checkRole(['ADMIN']), searchAuthor)

// get owner detail
router.get('/profile', verifyToken, getOwnerDetail)

// delete host
router.delete('/:id', verifyToken, checkRole(['ADMIN']), adminDelete)

// admin get user detail
router.get('/admin/user/:id', verifyToken, checkRole(['ADMIN']), adminViewUser)

// admin update user detail
router.patch('/update/:id', verifyToken, checkRole(['ADMIN']), updateUser)

// user update user detail
router.patch('/detail/update', verifyToken, userUpdateDetail)

// change password
router.patch('/password/change', verifyToken, changePassword)

module.exports = router

