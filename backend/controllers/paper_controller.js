
// import model
const Paper = require('../models/paper')
const PaperFile = require('../models/paper_file')
const editPaperFile = require('../models/paper_edit')
const paperAssign = require('../models/paper_assign')
const paperAssignHistory = require('../models/paper_assign_history')
const Notification = require('../models/notification')
const Counters = require('../models/counter')


const nodemailer = require('nodemailer')
const mongoose = require('mongoose')
const { createNotification } = require('../middlewares/notification')
const fs = require('fs')
const dayjs = require('dayjs')

//get all paper
const getPapers = async (req, res) => {
    try {
        const paper = await Paper.find({})
        res.status(200).json(paper)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// get paper when paper is 
const getPaperArchive = async (req, res) => {

    const { _id } = req.user

    try {
        const paper = await Paper.find({ owner: _id, result: 'ACCEPT', award_rate: { $ne: null } })
        res.status(200).json(paper)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}

// get by user
const getPaperByUser = async (req, res) => {
    const { _id } = req.user

    try {
        const paper = await Paper.find({ owner: _id, status: { $ne: 'CANCEL' } }).populate('confr_code cate_code')
        res.status(200).json(paper)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//get a single paper
const getSinglePaper = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'This is not a id' })
    }

    try {
        const paper = await Paper.findOne({ _id: id, owner: req.user._id }).populate('cate_code confr_code publication')
        if (!paper) {
            return res.status(404).json({ error: 'Item not found' })
        }
        res.status(200).json(paper)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

// get for review
const getReviewPaper = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'รหัสบทความไม่ถูกต้อง' })
    }

    try {
        const paper = await Paper.findById(id).populate('cate_code confr_code publication owner', '-owner.password')
        if (!paper) {
            return res.status(404).json({ error: 'ไม่พบงานประชุม' })
        }
        res.status(200).json(paper)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// สร้าง document counter จาก id

// นับรหัสบทความ นำเอา รหัส Category มาใส่
async function getNextSequenceValue(sequenceId) {
    console.log(sequenceId)
    const sequenceDocument = await Counters.findOneAndUpdate(
        { _id: sequenceId },
        { $inc: { sequence_value: 1 } },
        { upsert: true, new: true }
    );
    return sequenceDocument.sequence_value
}

// create paper
const createPaper = async (req, res) => {
    const {
        title,
        paper_code,
        cate_code,
        confr_code,
        publication,
        regis_type,
        advise,
        group,
        university,
        keyword,
        author,
        email,
        contact,
        address
    } = req.body

    const user_id = req.user._id

    //check if user resumit but not cancel paper before
    const check = await Paper.findOne({ owner: user_id, confr_code, status: { $ne: 'CANCEL' } })

    if (check) {
        return res.status(400).json({ error: 'บทความในงานประชุมนี้อยู่ระหว่างดำเนินการ กรยกเลิกบทความเดิมก่อนทำการส่งใหม่' })
    }

    try {
        let paperId = await getNextSequenceValue(cate_code)
        let paperCode = paper_code + paperId
        const paper = await Paper.create({
            title,
            paper_code: paperCode,
            cate_code,
            confr_code,
            owner: user_id,
            publication,
            regis_type,
            university,
            address,
            contact,
            email,
            author,
            advise,
            group,
            keyword,
        })
        await Notification.create({ user_id: confr_code, title: 'แจ้งเตือนบทความใหม่', message: 'มีบทความใหม่ถูกส่งเข้ามา กรุณาตรวจสอบ' })
        res.status(200).json(paper)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// host upload close name file
const uploadCloseNamePaper = async (req, res) => {
    const { filename } = req.file
    const { _id } = req.body

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ error: 'รหัสบทความไม่ถูกต้อง' })
    }

    if (!filename) {
        return res.status(400).json({ error: 'ไม่พบข้อมูลไฟล์' })
    }

    try {
        const paper = await Paper.findByIdAndUpdate(
            _id,
            {
                close_name_file: filename
            },
            { new: true }
        )
        res.status(200).json(paper)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// author upload edit paper files
const uploadEditPaper = async (req, res) => {
    const { filename } = req.file
    const { _id } = req.body

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ error: 'รหัสบทความไม่ถูกต้อง' })
    }

    if (!filename) {
        return res.status(400).json({ error: 'ไม่พบข้อมูลไฟล์' })
    }

    try {
        const paper = await Paper.findByIdAndUpdate(
            _id,
            {
                edit_paper: filename,
                status: "PENDING"
            },
            { new: true }
        )
        await Notification.create({ user_id: paper.confr_code, title: 'มีการแก้ไขบทความ', message: paper.paper_code + ' มีการอัพโหลดไฟล์บทความฉบับแก้ไข' })
        res.status(200).json(paper)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// host change paper status
const updatePaperResult = async (req, res) => {
    const { _id, result, deadline } = req.body

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ error: 'รหัสบทความไม่ถูกต้อง' })
    }

    if (result === 'ACCEPT') {
        try {
            const paper = await Paper.findByIdAndUpdate(_id, { status: "SUCCESS", result, payment_status: "PENDING" }, { new: true })
            if (!paper) {
                return res.status(404).json({ error: 'Item not found' })
            }
            await createNotification(paper.owner, `บทความ ${paper.paper_code} ตรวจเสร็จแล้ว`, `บทความของท่านผ่านการพิจารณา ท่านสามารถชำระค่าลงทะเบียนและเข้าร่วมงานประชุมได้ตามกำหนดการงานประชุมหน้าเว็บไซต์`)
            res.status(200).json(paper)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    } else if (result === 'REVISE') {
        try {
            const paper = await Paper.findByIdAndUpdate(_id, { status: "SUCCESS", result }, { new: true })
            if (!paper) {
                return res.status(404).json({ error: "paper not found" })
            }
            await Notification.create({ user_id: paper.owner, title: `บทความ ${paper.paper_code} ตรวจเสร็จแล้ว`, message: `มีการแก้ไข กำหนดการส่งบทความคือ ${dayjs(deadline).format('DD MMM, YYYY')}` })
            paper.deadline.push(deadline)
            paper.save()
            res.status(200).json(paper)
        } catch (error) {
            console.log(error)
            res.status(400).json({ error: error.message })
        }
    } else {
        try {
            const paper = await Paper.findByIdAndUpdate(_id, { status: "SUCCESS", result }, { new: true })
            if (!paper) {
                return res.status(404).json({ error: 'Item not found' })
            }
            await createNotification(paper.owner, `บทความ ${paper.paper_code} ตรวจเสร็จแล้ว`, `กรุณาตรวจสอบข้อมูลบทความ`)
            res.status(200).json(paper)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
}

// cancel paper
const cancelPaper = async (req, res) => {
    const { _id } = req.user

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ error: 'รหัสบทความไม่ถูกต้อง' })
    }

    try {
        const find = await Paper.findOne({ _id, owner: req.user._id })
        if (!find) {
            return res.status(400).json({ error: 'Item not found' })
        }

        if (find.status !== 'PENDING')
            return res.status(400).json({ error: 'ไม่สามารถยกเลิกบทความได้เนื่องจากมอบหมายให้กรรมการแล้ว' })
        const paper = await Paper.findByIdAndUpdate(_id, { status: 'CANCEL' })
        // create notification
        await createNotification(req.user._id, `ยกเลิกบทความสำเร็จ`, `บทความ ${paper.paper_code} ถูกยกเลิกแล้ว`)
        res.status(204).send('Cancel paper success')
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// get single public
const publicPaperSingle = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'รหัสบทความไม่ถูกต้อง' })
    }

    try {
        const paper = await Paper.findOne({ _id: id, "published.status": true })
        if (!paper) {
            return res.status(404).json({ error: 'ไม่พบข้อมูล' })
        }
        res.status(200).json(paper)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// get all public
const publicPaperAll = async (req, res) => {
    try {
        const paper = await Paper.find({ status: 'SUCCESS', result: 'ACCEPT', award_rate: { $ne: null } })
        res.status(200).json(paper)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// get paper for confr
const getPaperForConference = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'รหัสงานประชุมไม่ถูกต้อง' })
    }

    try {
        const paper = await Paper.find({ confr_code: id, status: { $ne: 'CANCEL' } })
        res.status(200).json(paper)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// get by category
const getPaperByCategory = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'รหัสหัวข้องานประชุมไม่ถูกต้อง' })
    }

    try {
        const paper = await Paper.find({ cate_code: id })
        res.status(200).json(paper)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// get paper award
const getPaperAward = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'รหัสหัวข้อไม่ถูกต้อง' })
    }

    try {
        const paper = await Paper.find({ cate_code: id, award_rate: { $ne: '' } })
        res.status(200).json(paper)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// get paper award for confr
const getConfrPaperAward = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'รหัสงานประชุมไม่ถูกต้อง' })
    }

    try {
        const paper = await Paper.find({
            confr_code: id,
            award_rate: { $ne: '' },
            result: 'ACCEPT'
        }).populate('cate_code')
        res.status(200).json(paper)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// update paper
const updatePaperStatus = async (req, res) => {
    const { id, status } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'รหัสบทความไม่ถูกต้อง' })
    }

    if (!status) {
        return res.status(400).json({ error: 'กรุณาใส่สถานะบทความ' })
    }

    try {
        const paper = await Paper.findByIdAndUpdate(id, { status }, { new: true })
        res.status(200).json(paper)
    } catch (error) {
        res.status(400).json(error.message)
    }

}

// update paper award rate
const updatePaperAward = async (req, res) => {
    const { id, award_rate } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'รหัสบทความไม่ถูกต้อง' })
    }

    if (!award_rate) {
        return res.status(400).json({ error: 'กรุณาระบุอันดับ' })
    }

    try {
        const paper = await Paper.findByIdAndUpdate(id, { award_rate }, { new: true })
        res.status(200).json(paper)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}


// search paper
const searchPaper = async (req, res) => {
    const { page = 1, limit = 10, search = '' } = req.query
    const query = search ? { title: { $regex: search, $options: 'i' } } : {}
    try {
        const items = await Paper.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec()
        const count = await Paper.countDocuments(query)
        res.status(200).json({
            items,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const hostSeachPaper = async (req, res) => {
    const { page = 1, limit = 10, search = '' } = req.query
    const { id } = req.params
    const query = search ? { title: { $regex: search, $options: 'i' }, confr_code: id } : { confr_code: id }
    try {
        const items = await Paper.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec()
        const count = await Paper.countDocuments(query)
        res.status(200).json({
            items,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// author search
const authorSearch = async (req, res) => {
    const { page = 1, limit = 10, search = '' } = req.query
    const { _id } = req.user
    const query = search ?
        { title: { $regex: search, $options: 'i', }, owner: _id, status: { $ne: "CANCEL" }, result: { $ne: "PUBLIC" } } :
        { owner: _id, status: { $ne: "CANCEL" }, result: { $ne: "PUBLIC" } }
    try {
        const items = await Paper.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .populate('confr_code cate_code')
            .sort({'createdAt': -1})
        const count = await Paper.countDocuments(query)
        res.status(200).json({
            items,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// view paper and user
const adminPaper = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({ error: 'รหัสบทความไม่ถูกต้อง' })

    try {
        const paper = await Paper.findById(id).populate('owner cate_code confr_code publication', '-owner.password')
        if (!paper)
            return res.status(404).json({ error: 'ไม่พบบทความ' })

        res.status(200).json(paper)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// get paper list by owner from admin
const getPaperOwnerAdmin = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'รหัสผู้ใช้งานไม่ถูกต้อง' })
    }

    try {
        const paper = await Paper.find({ owner: id })
        res.status(200).json(paper)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// delete paper
const deletePaper = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({ error: 'รหัสบทความไม่ถูกต้อง' })

    try {

        const paper = await Paper.findById(id)
        if (!paper) {
            return res.status(404).json({ error: 'ไม่พบบทความ' })
        }

        if (paper.status !== 'CANCEL') {
            return res.status(400).json({ error: 'ยกเลิกบทความก่อนทำงานลบบทความ' })
        }

        if (paper.payment_image) {
            fs.unlink(`public/uploads/${paper.payment_image}`, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('Payment image is deleted')
                }
            })
        }

        // check paper file path
        const file = await PaperFile.find({ paper_id: id })
        for (const doc of file) {
            if (doc.original_file) {
                fs.unlink('public/uploads/' + doc.original_file, (err) => {
                    if (err)
                        console.log(err)
                    else {
                        console.log('Original file is deleted')
                    }
                })
            }

            if (doc.close_name_file) {
                fs.unlink('public/uploads/' + doc.close_name_file, (err) => {
                    if (err)
                        console.log(err)
                    else {
                        console.log("Close name file is deleted")
                    }
                })
            }

            // check paper file history
            const history = await editPaperFile.find({ file_id: doc._id })
            for (const sub_doc of history) {
                if (sub_doc.original_file) {
                    fs.unlink('public/uploads/' + sub_doc.original_file, (err) => {
                        if (err)
                            console.log(err)
                        else {
                            console.log('Original file is deleted')
                        }
                    })
                }

                if (sub_doc.close_name_file) {
                    fs.unlink('public/uploads/' + sub_doc.close_name_file, (err) => {
                        if (err)
                            console.log(err)
                        else {
                            console.log("Close name file is deleted")
                        }
                    })
                }
            }
            // delete history document
            await editPaperFile.deleteMany({ file_id: doc._id })
        }

        // delete file document
        await PaperFile.deleteMany({ paper_id: id })

        // check paper assign
        const assign = await paperAssign.find({ paper_id: id })
        for (const doc of assign) {
            if (doc.suggestion_file) {
                fs.unlink('public/uploads/' + doc.suggestion_file, (err) => {
                    if (err)
                        console.log(err)
                    else {
                        console.log('Suggestion file is Deleted')
                    }
                })
            }
            // check paper assign history
            const history = await paperAssignHistory.find({ review_id: doc._id })
            for (const sub_doc of history) {
                if (sub_doc.suggestion_file) {
                    fs.unlink('public/uploads/' + sub_doc.suggestion_file, (err) => {
                        if (err)
                            console.log(err)
                        else {
                            console.log('Paper assign file history is deleted')
                        }
                    })
                }
            }

            // delete paper assign history
            await paperAssignHistory.deleteMany({ review_id: doc._id })
        }

        // delete paper assign
        await paperAssign.deleteMany({ paper_id: id })

        // delete paper document
        await Paper.findByIdAndDelete(id)

        res.status(204).send('Paper and Comment is deleted')
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const editPaperStatus = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'รหัสบทความไม่ถูกต้อง' })
    }

    try {
        const paper = await Paper.findByIdAndUpdate(id, { status: 'PENDING' }, { new: true })
        if (!paper) {
            return res.status(404).json({ error: 'ไม่พบบทความ' })
        }
        res.status(200).json(paper)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}

// author edit paper detail
const editPaperDetail = async (req, res) => {
    const { id } = req.params

    const { _id } = req.user

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "รหัสบทความไม่ถูกต้อง" })
    }

    try {
        const update = await Paper.findOneAndUpdate({ _id: id, owner: _id }, req.body, { new: true })
        res.status(200).json(update)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

// ส่งจดหมายรับเชิญ
const sendEmailPdf = async (req, res) => {

    const { recipient, confr_title, owner, paper_id } = req.body


    if (!req.file) {
        return res.status(400).json({ error: 'เกิดข้อผิดพลาดเกี่ยวกับการ upload file' })
    }

    if (!mongoose.Types.ObjectId.isValid(paper_id)) {
        fs.unlink(req.file.path, (err) => {
            if (err) {
                console.error('ไม่สามารถลบไฟล์ได้: ', err)
            } else {
                console.log('ลบไฟล์สำเร็จ')
            }
        })
        return res.status(400).json({ error: 'รหัสบทความไม่ถูกต้อง' })
    }


    let transpoter = nodemailer.createTransport({
        service: 'Gmail', //สามารถเปลี่ยนเป็นบริการ SMTP ของที่อื่นได้นอกจาก Gmail
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.GMAIL_PASS,
        }
    })

    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipient,
        subject: `ขอเรียนเชิญเข้าร่วมงานประชุมวิชาการ ${confr_title}`,
        text: 'ทดสอบการส่งจดหมายงานประชุมวิชการ',
        attachments: [
            {
                filename: req.file.original_file,
                path: req.file.path
            }
        ]
    }

    transpoter.sendMail(mailOptions, function (error, info) {
        if (error) {
            fs.unlink(req.file.path, (unlinkError) => {
                if (unlinkError) {
                    console.error('ลบไฟล์ล้มเหลว: ', unlinkError)
                } else {
                    console.log('ลบไฟล์สำเร็จ')
                }
            })
            console.log(error)
            return res.status(500).json({ error: error.message })
        } else {
            console.log('Email send: ' + info.response)
        }
    })

    try {
        const paper = await Paper.findById(paper_id)
        if (!paper) {
            return res.status(404).json({ error: 'ไม่พบบทความ' })
        }
        paper.letter = req.file.filename
        paper.save()
        await Notification.create({ user_id: owner, title: 'ขอเชิญเข้าร่วมงานประชุม', message: `กรุณาตรวจสอบอีเมล ${recipient} สำหรับอ่านจดหมายเชิญ` })
        res.status(200).json(paper)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}

// ส่ง mail ใบประกาศ
const sendCertificate = async (req, res) => {

    const { recipient, confr_title, owner, paper_id } = req.body


    if (!req.file) {
        return res.status(400).json({ error: 'เกิดข้อผิดพลาดเกี่ยวกับการ upload file' })
    }

    if (!mongoose.Types.ObjectId.isValid(paper_id)) {
        fs.unlink(req.file.path, (err) => {
            if (err) {
                console.error('ไม่สามารถลบไฟล์ได้: ', err)
            } else {
                console.log('ลบไฟล์สำเร็จ')
            }
        })
        return res.status(400).json({ error: 'รหัสบทความไม่ถูกต้อง' })
    }


    let transpoter = nodemailer.createTransport({
        service: 'Gmail', //สามารถเปลี่ยนเป็นบริการ SMTP ของที่อื่นได้นอกจาก Gmail
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.GMAIL_PASS,
        }
    })

    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipient,
        subject: `หนังสือรับรองโดย ${confr_title}`,
        attachments: [
            {
                filename: req.file.original_file,
                path: req.file.path
            }
        ]
    }

    transpoter.sendMail(mailOptions, function (error, info) {
        if (error) {
            fs.unlink(req.file.path, (unlinkError) => {
                if (unlinkError) {
                    console.error('ลบไฟล์ล้มเหลว: ', unlinkError)
                } else {
                    console.log('ลบไฟล์สำเร็จ')
                }
            })
            console.log(error)
            return res.status(500).json({ error: error.message })
        } else {
            console.log('Email send: ' + info.response)
        }
    })

    try {
        const paper = await Paper.findById(paper_id)
        if (!paper) {
            return res.status(404).json({ error: 'ไม่พบบทความ' })
        }
        paper.certificate = req.file.filename
        paper.save()
        await Notification.create({ user_id: owner, title: 'คุณได้รับใบรับรอง', message: `กรุณาตรวจสอบอีเมล ${recipient} เพื่อตรวจสอบใบรับรอง` })
        res.status(200).json(paper)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}


module.exports = {
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
    authorSearch,
    adminPaper,
    deletePaper,
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
    getConfrPaperAward
}