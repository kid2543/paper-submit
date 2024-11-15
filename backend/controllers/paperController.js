const Paper = require('../models/paper')
const mongoose = require('mongoose')
const { createNotification } = require('../middlewares/notification')

//get all paper
const getPapers = async (req, res) => {
    try {
        const paper = await Paper.find()
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

    const paper = await Paper.findById(id)

    if (!paper) {
        return res.status(404).json({ error: 'No such paper' })
    }

    res.status(200).json(paper)
}

//create paper
const createPaper = async (req, res) => {
    const {
        title,
        paper_code,
        cate_code,
        confr_code,
        publication,
        regis_type
    } = req.body

    const { filename } = req.file

    let emptyFileds = []

    if (!title) {
        emptyFileds.push('title')
    }

    if (!paper_code) {
        emptyFileds.push('paper_code')
    }

    if (!cate_code) {
        emptyFileds.push('cate_code')
    }
    if (!confr_code) {
        emptyFileds.push('confr_code')
    }

    if (!publication) {
        emptyFileds.push('publication')
    }
    if (!regis_type) {
        emptyFileds.push('regis_type')
    }

    if (!filename) {
        emptyFileds.push('paper_file')
    }

    if (emptyFileds.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFileds })
    }

    const user_id = req.user._id

    //check if user resumit but not cancel paper before
    const check = await Paper.findOne({ owner: user_id, confr_code, status: { $ne: 3 } })

    if (check) {
        return res.status(400).json({ error: 'Please cancel paper before new submit' })
    }

    try {
        const paperNumber = await Paper.countDocuments({ cate_code })
        let paperCode = paper_code + paperNumber
        const paper = await Paper.create({
            title,
            paper_code: paperCode,
            cate_code,
            confr_code,
            owner: user_id,
            publication,
            regis_type,
            paper_file: filename
        })
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

// host change paper status
const updatePaperStatus = async (req, res) => {
    const { _id, result } = req.body

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ error: 'รหัสบทความไม่ถูกต้อง' })
    }

    if (result === 'ACCECPT') {
        try {
            const paper = await Paper.findByIdAndUpdate(_id, { status: "SUCCESS", result, payment_status: "PENDING" }, { new: true })
            if (!paper) {
                return res.status(400).json({ error: 'Item not found' })
            }
            await createNotification(paper.owner, `บทความ ${paper.paper_code} มีการเปลี่ยนแปลง`, `สถานะบทความ ${paper.status}`)
            res.status(200).json(paper)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    } else {
        try {
            const paper = await Paper.findByIdAndUpdate(_id, { status: "SUCCESS", result }, { new: true })
            if (!paper) {
                return res.status(400).json({ error: 'Item not found' })
            }
            await createNotification(paper.owner, `บทความ ${paper.paper_code} มีการเปลี่ยนแปลง`, `สถานะบทความ ${paper.status}`)
            res.status(200).json(paper)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
}

// edit and upload edit version 
const revisePaper = async (req, res) => {
    const { paper_id } = req.body
    const { _id } = req.user

    if (!mongoose.Types.ObjectId.isValid(paper_id)) {
        return res.status(400).json({ error: 'รหัสบทความไม่ถูกต้อง' })
    }

    const checkPaper = await Paper.findById(paper_id)

    if (!checkPaper) {
        return res.status(400).jsos({ error: 'Item not found' })
    }

    if (!checkPaper.owner.equals(_id)) {
        return res.status(400).json({ error: 'ผู้ใช้งานไม่ตรงกับเจ้าของบทความ' })
    }

    if (req.file) {
        const { filename } = req.file
        try {
            const paper = await Paper.findByIdAndUpdate(paper_id, {
                $push: {edit_paper: filename},
                $set: req.body
            }, { new : true })
            res.status(200).json(paper)
        } catch (error) {
            res.status(400).json({error: error.message})
        }
    } else {
        try {
            const paper = await Paper.findByIdAndUpdate(paper_id, req.body, { new : true })
            res.status(200).json(paper)
        } catch (error) {
            res.status(400).json({error: error.message})
        }
    }

}

module.exports = {
    getPapers,
    getSinglePaper,
    createPaper,
    uploadCloseNamePaper,
    updatePaperStatus,
    revisePaper,
}