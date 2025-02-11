const express = require('express')

//midlewares
const requireAuth = require('../middlewares/requireAuth')
const uploadPdf = require('../middlewares/uploadFile')

// controller
const {
    getPapers,
    getSinglePaper,
    createPaper,
    uploadCloseNamePaper,
    updatePaperStatus,
    getPaperByUser,
    cancelPaper,
    publicPaperSingle,
    publicPaperAll,
    getPaperForConference,
    getReviewPaper,
    updatePaperResult,
    searchPaper,
    adminPaper,
    deletePaper,
    authorSearch,
    editPaperDetail,
    hostSeachPaper,
    uploadEditPaper,
    editPaperStatus,
    updatePaperAward,
    getPaperByCategory,
    getPaperAward,
    sendEmailPdf,
    sendCertificate,
    getPaperArchive,
    getPaperOwnerAdmin
} = require('../controllers/paper_controller')
const verifyToken = require('../middlewares/VerifyToken')
const checkRole = require('../middlewares/checkRole')

const router = express.Router()

//all paper เปลี่ยนเป็น เฉพาะ admin สามารถดูได้ทั้งหมด
router.get('/', verifyToken, checkRole(['ADMIN']), getPapers)

// get for user in process
router.get('/owner', verifyToken, checkRole(['AUTHOR']), getPaperByUser)

// owner single paper
router.get('/owner/:id', verifyToken, checkRole(['AUTHOR']), getSinglePaper)

// single for host
router.get('/host/:id', verifyToken, checkRole(['HOST', 'ADMIN']), getReviewPaper)

// get single public
router.get('/single/:id', publicPaperSingle)

// get all public
router.get('/all', publicPaperAll)

// get for conference
router.get('/confr/:id', verifyToken, checkRole(['HOST', 'ADMIN']), getPaperForConference)

// get by category
router.get('/category/:id', verifyToken, getPaperByCategory)

//get only have awarad
router.get('/category/award/:id', verifyToken, getPaperAward)

// cancel paper
router.patch('/cancel', verifyToken, cancelPaper)

//create paper
router.post('/create', verifyToken, checkRole(['AUTHOR']), createPaper)

// upload close name file
router.patch('/close/file', verifyToken, checkRole(['HOST', 'ADMIN']), uploadPdf.single('file'), uploadCloseNamePaper)

// upload edit paper file
router.patch('/edit/file', verifyToken, checkRole(['AUTHOR']), uploadPdf.single('file'), uploadEditPaper)

// author edit paper detail
router.patch('/update/:id', verifyToken, checkRole(['AUTHOR']), editPaperDetail)

// update paper result 
router.patch('/result', verifyToken, checkRole(['HOST', 'ADMIN']), updatePaperResult)

// update paper status
router.patch('/status', verifyToken, checkRole(['HOST', 'ADMIN']), updatePaperStatus)

// update paper award
router.patch('/award', verifyToken, checkRole(['ADMIN', 'HOST']), updatePaperAward)

// search paper
router.get('/search', verifyToken, checkRole(['ADMIN']), searchPaper)

// get paper is pass
router.get('/archive', verifyToken, checkRole(['AUTHOR']), getPaperArchive)

// host search paper
router.get('/host/search/:id', verifyToken, checkRole(['HOST', 'ADMIN']), hostSeachPaper)

// author search paper
router.get('/author/search', verifyToken, checkRole(['AUTHOR', 'ADMIN']), authorSearch)

// get paper for admin
router.get('/admin/:id', verifyToken, checkRole(['ADMIN']), adminPaper)

// get paper by owner id by admin
router.get('/admin/owner/:id', verifyToken, checkRole(['ADMIN']), getPaperOwnerAdmin)

// delete paper
router.delete('/:id', verifyToken, checkRole(['ADMIN']), deletePaper)

// author comfirm edit paper
router.patch('/edit/status/:id', verifyToken, checkRole(['AUTHOR']), editPaperStatus)

// send email
router.post('/send/email', verifyToken, checkRole(['HOST', 'ADMIN']), uploadPdf.single('file'), sendEmailPdf)

// send certificate
router.post('/send/certificate', verifyToken, checkRole(['HOST', 'ADMIN']), uploadPdf.single('file'), sendCertificate)


module.exports = router

