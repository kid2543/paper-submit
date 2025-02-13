// import model
const paperAssign = require('../models/paper_assign')
const paperAssignHistory = require('../models/paper_assign_history')
const Paper = require('../models/paper')
const Notification = require('../models/notification')

const mongoose = require('mongoose')
const fs = require('fs')
const { createNotification } = require('../middlewares/notification')

//assign paper
const assignPaper = async (req, res) => {
    const { reviewer, paper_id } = req.body
    let check = []

    if (!mongoose.Types.ObjectId.isValid(reviewer)) {
        return res.status(400).json({ error: 'รหัสกรรมการไม่ถูกต้อง' })
    }

    if (!mongoose.Types.ObjectId.isValid(paper_id)) {
        return res.status(400).json({ error: 'รหัสบทความไม่ถูกต้อง' })
    }

    check = await paperAssign.find({ reviewer, paper_id, status: { $ne: 'CANCEL' } })

    if (check.length > 0) {
        return res.status(400).json({ error: 'บทความนี้ได้ถูกมอบหมายให้กรรมการแล้ว' })
    }

    try {
        // create assignment 
        const assign = await paperAssign.create({ reviewer, paper_id })
        // create notification
        await Notification.create({ user_id: reviewer, title: 'บทความใหม่', message: 'มีบทความใหม่รอการให้คะแนน' })
        res.status(200).json(assign)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

// review the paper
const reviewPaper = async (req, res) => {
    const {
        _id,
        suggestion,
        rate,
        total,
        result,
        confr_id,
        paper_code,
    } = req.body

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        if (req.file) {
            fs.unlink(req.file.path, (err) => {
                if (err) {
                    console.error('Error deleting the file:', err)
                }
                console.log("file is deleted")
            })
        }
        return res.status(400).json({ error: 'รหัสการให้คะแนนไม่ถูกต้อง' })
    }

    const check = paperAssign.findById(_id)

    if (!check) {
        if (req.file) {
            fs.unlink(req.file.path, (err) => {
                if (err) {
                    console.error('Error deleting the file:', err)
                }
                console.log("file is deleted")
            })
        }
        return res.status(400).json({ error: 'ไม่พบข้อมูล' })
    }

    if (req.file) {
        try {
            const { filename } = req.file
            const review = await paperAssign.findByIdAndUpdate(
                _id,
                {
                    status: "SUCCESS",
                    suggestion,
                    suggestion_file: filename,
                    rate,
                    total,
                    result
                },
                { new: true, runValidators: true }
            )
            // create notification
            await Notification.create({ user_id: confr_id, title: 'แจ้งเตือนการตรวจบทความ', message: 'บทความ ' + paper_code + ' ตรวจแล้ว' })
            res.status(200).json(review)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    } else {
        try {
            const review = await paperAssign.findByIdAndUpdate(
                _id,
                {
                    status: "SUCCESS",
                    suggestion,
                    rate,
                    total,
                    result
                },
                { new: true, runValidators: true }
            )
            // create notification
            await Notification.create({ user_id: confr_id, title: 'แจ้งเตือนการตรวจบทความ', message: 'บทความ ' + paper_code + ' ตรวจแล้ว' })
            res.status(200).json(review)
        } catch (error) {
            if (req.file) {
                fs.unlink(req.file.path, (err) => {
                    if (err) {
                        console.error('Error deleting the file:', err)
                    }
                    console.log("file is deleted")
                })
            }
            res.status(400).json({ error: error.message })
        }
    }
}

// upload sugestion fil after
const uploadSuggestionFile = async (req, res) => {
    const { filename } = req.file
    const { id } = req.params

    if (!req.file) {
        return res.status(400).json({ error: "not found the file" })
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        fs.unlink(req.file.path, (err) => {
            if (err) {
                console.error('Error deleting the file:', err)
            }
            console.log("file is deleted")
        })
        return res.status(400).json({ error: 'รหัสแบบประเมินไม่ถูกต้อง' })
    }

    try {
        const assign = await paperAssign.findByIdAndUpdate(id, {
            suggestion_file: filename
        }, { new: true })
        res.status(200).json(assign)
    } catch (error) {
        fs.unlink(req.file.path, (err) => {
            if (err) {
                console.error('Error deleting the file:', err)
            }
            console.log("file is deleted")
        })
        res.status(400).json({ error: error.message })
    }
}

// read paper review
const readReview = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'ไม่ใช่รหัสบทความ' })
    }

    try {
        const review = await paperAssign.find({ paper_id: id }).populate('reviewer', 'name username')
        res.status(200).json(review)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// get reviewer number
const reviewerNumber = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'รหัสกรรมการไม่ถูกต้อง' })
    }

    try {
        const review = await paperAssign.find({ reviewer: id, $or: [{ status: 'PENDING' }, { result: 'REVISE' }] })
        res.status(200).json(review.length)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// get reviwe for reviewer
const getReview = async (req, res) => {
    const { page = 1, limit = 10 } = req.query
    const { _id } = req.user

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ error: 'รหัสกรรมการไม่ถูกต้อง' })
    }

    //     const items = await Paper.find(query)
    //     .limit(limit * 1)
    //     .skip((page - 1) * limit)
    //     .exec()
    // const count = await Paper.countDocuments(query)
    // res.status(200).json({
    //     items,
    //     totalPages: Math.ceil(count / limit),
    //     currentPage: page,
    // })

    try {
        const items = await paperAssign.find({ reviewer: _id })
            .populate('paper_id')
            .limit(limit * 1)
            .skip((page - 1) * limit)
        const count = await paperAssign.countDocuments({ reviewer: _id })
        res.status(200).json({
            items,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// get single
const getOneReview = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'รหัสรายการตรวจบทความไม่ถูกต้อง' })
    }

    try {
        const review = await paperAssign.findById(id).populate('paper_id')
        res.status(200).json(review)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// edit review version
const editReview = async (req, res) => {
    const { id, paper_code } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'รหัสบทความไม่ถูกต้อง' })
    }

    try {
        const find = await paperAssign.find({ paper_id: id })
        if (!find) {
            return res.status(404).json({ error: 'ไม่พบข้อมูลรายการตรวจบทความ' })
        }
        for (let i in find) {
            const data = {
                status: find[i].status,
                review_id: find[i]._id,
                suggestion: find[i].suggestion,
                suggestion_file: find[i].suggestion_file,
                rate: find[i].rate,
                total: find[i].total,
                result: find[i].result
            }
            await paperAssignHistory.create(data)
            await paperAssign.findByIdAndUpdate(find[i]._id, {
                status: 'PENDING',
                result: 'PENDING',
                suggestion: "",
                suggestion_file: "",
                rate: [],
                total: 0,
            })
            await createNotification(find[i].reviewer, `มีการมอบหมายบทความฉบับแก้ไข`, `บทความ ${paper_code} แก้ไขเรียบร้อยรอการประเมิน`)
        }
        await Paper.findByIdAndUpdate(id, { status: "REVIEW" })
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}

// remove assign
const removeAssign = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({error : 'รหัสรายการตรวจไม่ถูกต้อง'})

    try {
        await paperAssign.deleteOne({_id: id})
        res.status(204).send('ลบรายการตรวจสำเร็จ')
    } catch (error) {
        res.status(400).json({error : error.message})        
    }
}

module.exports = {
    assignPaper,
    reviewPaper,
    readReview,
    reviewerNumber,
    getReview,
    getOneReview,
    uploadSuggestionFile,
    editReview,
    removeAssign
}