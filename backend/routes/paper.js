const express = require('express')

//midlewares
const uploadPdf = require('../middlewares/uploadFile')
const uploadImage = require('../middlewares/uploadImage')

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
    getPaperOwnerAdmin,
    getConfrPaperAward,
    PublicPaper,
    UnPublicPaper,
    rejectPaper,
    uploadPayment,
    checkPayment,
    getPaperWithAcceptStatus,
    getPaperOwnerRegis
} = require('../controllers/paper_controller')
const verifyToken = require('../middlewares/VerifyToken')
const checkRole = require('../middlewares/checkRole')

const router = express.Router()

//all paper เปลี่ยนเป็น เฉพาะ admin สามารถดูได้ทั้งหมด
router.get('/', verifyToken, checkRole(['ADMIN']), getPapers)

// public  paper
router.patch('/public/:id', verifyToken, checkRole(['ADMIN', 'HOST']), PublicPaper)

// change public paper
router.patch('/unpublic/:id', verifyToken, checkRole(['ADMIN', 'HOST']), UnPublicPaper)

// get for user in process
router.get('/owner', verifyToken, checkRole(['AUTHOR']), getPaperByUser)

// owner single paper
router.get('/owner/:id', verifyToken, checkRole(['AUTHOR']), getSinglePaper)

// single for host
router.get('/host/:id', verifyToken, checkRole(['HOST', 'ADMIN']), getReviewPaper)

// get single public
router.get('/single/:id', publicPaperSingle)

// reject paper
router.patch('/reject/:id', verifyToken, checkRole(['ADMIN', 'HOST']), rejectPaper)

// get all public
router.get('/all', publicPaperAll)

// get for conference
router.get('/confr/:id', verifyToken, checkRole(['HOST', 'ADMIN']), getPaperForConference)

// get owner paper regis
router.get('/regis/:id', verifyToken, checkRole(['HOST', 'ADMIN']), getPaperOwnerRegis)

// get by category
router.get('/category/:id', verifyToken, getPaperByCategory)

// get paper only accept status
router.get('/edit/award/:id', verifyToken, checkRole(['HOST', 'ADMIN']), getPaperWithAcceptStatus )

//get only have awarad
router.get('/category/award/:id', verifyToken, getPaperAward)

// get paper award
router.get('/confr/award/:id', getConfrPaperAward)

// cancel paper
router.patch('/cancel/:id', verifyToken, cancelPaper)

//create paper
router.post('/create', verifyToken, checkRole(['AUTHOR']), createPaper)

// upload close name file
router.patch('/close/file', verifyToken, checkRole(['HOST', 'ADMIN']), uploadPdf.single('file'), uploadCloseNamePaper)

// upload edit paper file
router.patch('/edit/file', verifyToken, checkRole(['AUTHOR']), uploadPdf.single('file'), uploadEditPaper)

// upload payment author
router.patch('/upload/payment/:id', verifyToken, checkRole(['AUTHOR']), uploadImage.single('image'), uploadPayment)

// host admin check payment
router.patch('/check/payment/:id', verifyToken, checkRole(['HOST', 'ADMIN']), checkPayment)

// author edit paper detail
router.patch('/update/:id', verifyToken, checkRole(['HOST']), editPaperDetail)

// update paper result 
router.patch('/result', verifyToken, checkRole(['HOST', 'ADMIN']), updatePaperResult)

// update paper status
router.patch('/status', verifyToken, checkRole(['HOST', 'ADMIN']), updatePaperStatus)

// update paper award
router.patch('/award', verifyToken, checkRole(['ADMIN', 'HOST']), updatePaperAward)

// search paper
router.get('/search', verifyToken, checkRole(['ADMIN']), searchPaper)

// get paper is pass for search
router.get('/archive', getPaperArchive)

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


module.exports = router

