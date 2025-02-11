const mongoose = require('mongoose')
const fs = require('fs')

// model
const Conferences = require('../models/conferences')
const Paper = require('../models/paper')


// upload venue image
const uploadVenue = async (req, res) => {
    const { filename } = req.file
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        fs.unlink(req.file.path, (err) => {
            if (err) {
                console.error('Error deleting the file:', err)
            }
            console.log("file is deleted")
        })
        return res.status(400).json({ error: 'รหัสงานประชุมไม่ถูกต้อง' })
    }

    if (!filename) {
        return res.status(400).json({ error: 'ไม่พบข้อมูลการอัพโหลด' })
    }

    try {
        const oldFile = await Conferences.findById(id)
        const confr = await Conferences.findByIdAndUpdate(id, {
            venue_image: filename
        }, { new: true })
        if (oldFile.venue_image !== '') {
            fs.unlink('public/uploads/' + oldFile.venue_image, (err) => {
                if (err) {
                    console.error('Error deleteing the file: ', err)
                } else {
                    console.log('old file is deleted')
                }
            })
        }
        res.status(200).json(confr)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const uploadLogo = async (req, res) => {
    const { filename } = req.file
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        fs.unlink(req.file.path, (err) => {
            if (err) {
                console.error('Error deleting the file:', err)
            }
            console.log("file is deleted")
        })
        return res.status(400).json({ error: 'รหัสงานประชุมไม่ถูกต้อง' })
    }

    if (!filename) {
        return res.status(400).json({ error: 'ไม่พบข้อมูลการอัพโหลด' })
    }

    try {
        const oldFile = await Conferences.findById(id)
        const confr = await Conferences.findByIdAndUpdate(id, {
            logo: filename
        }, { new: true })
        if (oldFile.logo !== '') {
            fs.unlink('public/uploads/' + oldFile.logo, (err) => {
                if (err) {
                    console.log('Error deleteing the file oldfile:', err)
                }
                console.log('old file is deleted')
            })
        }
        res.status(200).json(confr)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


//create conference
const createConference = async (req, res) => {
    const { title, confr_code, confr_start_date, confr_end_date } = req.body
    const { _id } = req.user

    let emptyField = []

    if (!title)
        emptyField.push('title')

    if (!confr_code)
        emptyField.push('confr_code')

    if (!confr_end_date)
        emptyField.push('confr_end_date')

    if (emptyField.length > 0)
        return res.status(400).json({ error: 'กรุณากรอกข้อมูลให้ครบ', emptyField })

    const confrCode = confr_code.toUpperCase()

    const check = await Conferences.findOne({ confr_code: confrCode })

    if (check) {
        return res.status(400).json({ error: 'รหัสงานประชุมนี้ถูกใช้ไปแล้ว' })
    }

    try {

        const confr = await Conferences.create({
            title,
            confr_code: confrCode,
            confr_start_date,
            confr_end_date,
            owner: _id
        })
        res.status(200).json(confr)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//edit conference
const editConference = async (req, res) => {

    const { _id } = req.body

    //check this is a id ?
    const check = mongoose.Types.ObjectId.isValid(_id)

    if (!check) {
        return res.status(400).json({ error: "This is not id" })
    }

    try {
        const confr = await Conferences.findByIdAndUpdate(_id, req.body, { new: true }).populate('publication')
        res.status(200).json(confr)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//get conference
const allConference = async (req, res) => {
    try {
        const confr = await Conferences.find({})
        res.status(200).json(confr)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// get 3 conference
const getHomeConfr = async (req, res) => {
    try {
        const confr = await Conferences.find({ status: true }).sort({ confr_start_date: 'asc' }).limit(3)
        res.status(200).json(confr)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//get open conference
const openConference = async (req, res) => {
    const today = new Date()
    try {
        const confr = await Conferences.find({ status: true })
        res.status(200).json(confr)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


// get open single conference
const singleConference = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'รหัสงานประชุมไม่ถูกต้อง' })
    }

    try {
        const confr = await Conferences.findOne({ _id: id }).populate("publication")
        if (!confr) {
            return res.status(404).json({ error: 'Item not found' })
        }
        res.status(200).json(confr)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// get for host dashboard
const getConferenceHost = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'รหัสงานประชุมไม่ถูกต้อง' })
    }

    try {
        const confr = await Conferences.findOne({ _id: id }).populate("publication")
        if (!confr) {
            return res.status(404).json({ error: 'ไม่พบข้อมูลงานประชุม' })
        }
        res.status(200).json(confr)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// get by host id
const getConferenceOwner = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'รหัสผู้ใช้งานไม่ถูกต้อง' })
    }

    try {
        const confr = await Conferences.find({ owner: id })
        res.status(200).json(confr)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}

// read conference with owner
const getConferByUser = async (req, res) => {
    const { _id } = req.user

    try {
        const confr = await Conferences.find({ owner: _id })
        res.status(200).json(confr)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// get question for committee
const getQuestion = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({ error: 'รหัสงานประชุมไม่ถูกต้อง' })

    try {
        const confr = await Conferences.findById(id)
        res.status(200).json(confr.question)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// search conference
const searchConference = async (req, res) => {
    const { page = 1, limit = 10, search = '', tag = '', cate = '' } = req.query

    let query = {}

    if (search) {
        query = { title: { $regex: search, $options: 'i' } }
    } else if (tag) {
        query = { tag: { $regex: tag, $options: 'i' } }
    } else if (cate) {
        query = { cate: { $regex: cate, $options: 'i' } }

    }

    try {
        const items = await Conferences.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec()
        const count = await Conferences.countDocuments(query)
        res.status(200).json({
            items,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// host search confrence
const hostSeachConference = async (req, res) => {
    const { page = 1, limit = 10, search = '', tag = '', cate = '' } = req.query

    const { _id } = req.user

    let query = { owner: _id }

    if (search) {
        query = { title: { $regex: search, $options: 'i' }, owner: _id }
    } else if (tag) {
        query = { tag: { $regex: tag, $options: 'i' }, owner: _id }
    } else if (cate) {
        query = { cate: { $regex: cate, $options: 'i' }, owner: _id }

    }

    try {
        const items = await Conferences.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec()
        const count = await Conferences.countDocuments(query)
        res.status(200).json({
            items,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// delete conference
const deleteConference = async (req, res) => {
    const { id } = req.params

    const { role } = req.user

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'รหัสงานประชุมไม่ถูกต้อง' })
    }
    try {
        const paper = await Paper.find({ confr_code: id, status: { $ne: 'CANCEL' } })
        if (paper.length > 0)
            return res.status(400).json({ error: 'งานประชุมมีบทความที่กำลังดำเนินการไม่สามารถลบได้' })
        let confr = {}
        if(role !== 'ADMIN') {
            confr = await Conferences.findOne({_id: id, owner: req.user._id})
            console.log('ไม่ใช่ Admin')
        } else {
            confr = await Conferences.findById(id)
            console.log('ฉันเป็นแอดมิน')
        }
        if (confr) {
            if (confr.venue_image)
                fs.unlink(`public/uploads/${confr.venue_image}`, (err) => {
                    if (err) {
                        console.log('ลบไฟล์สถานที่จัดงานไม่สำเร็จ',err)
                    } else {
                        console.log("ลบไฟล์รูปสถานที่จัดงานแล้ว")
                    }
                })
            await confr.deleteOne()
        }
        res.status(204).send("conference is deleted")
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    createConference,
    editConference,
    allConference,
    openConference,
    singleConference,
    getConferByUser,
    getConferenceHost,
    uploadVenue,
    uploadLogo,
    getQuestion,
    searchConference,
    deleteConference,
    hostSeachConference,
    getHomeConfr,
    getConferenceOwner
}