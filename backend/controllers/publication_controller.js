const Publication = require('../models/publication')
const Paper = require('../models/paper')
const Conference = require('../models/conferences')
const mongoose = require('mongoose')

// create
const createPublication = async (req, res) => {
    const { th_name, en_name, desc } = req.body

    let emptyField = []

    if(!th_name) {
        emptyField.push('th name')
    }

    if(!en_name) {
        emptyField.push('en name')
    }

    if(desc.length <= 0) {
        emptyField.push('desc')
    }

    if(emptyField.length > 0) {
        return res.status(400).json({error : 'กรุณากรอกข้อมูลให้ครบ', emptyField})
    }

    try {
        const pub = await Publication.create(req.body)
        res.status(201).json(pub)
    } catch (error) {
        res.status(400).json({error : error.message})
    }
}

// read
const getPublication = async (req, res) => {
    try {
        const pub = await Publication.find()
        res.status(200).json(pub)
    } catch (error) {
        res.status(400).json({error : error.message})
    }
}

// upadte
const updatePublication = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error : 'รหัสวารสารไม่ถูกต้อง'})
    }

    try {
        const pub = await Publication.findByIdAndUpdate(id, req.body, { new : true })
        if(!pub) {
            return res.status(404).json({error : 'ไม่พบข้อมูล'})
        }
        res.status(200).json(pub)
    } catch (error) {
        res.status(400).json({error : error.message})
    }
}

// delete
const deletePublication = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error : 'รหัสวารสารไม่ถูกต้อง'})
    }

    try {
        const check = await Paper.find({publication : id, status: {$ne : 'CANCEL'}})

        if(check.length > 0) {
            return res.status(400).json({error : 'ไม่สามารถลบวารสารได้ เนื่องจากมีบทความส่งมายังวารสารนี้แล้ว'})
        }

        const find = await Publication.findById(id)

        if(!find) {
            return res.status(404).json({error : 'ไม่พบข้อมูล'})
        }
        await Conference.updateMany({ publication : id }, { $pull: {publication : id}})
        await Publication.deleteOne({_id : id})
        res.status(204).send("item has deleted")
    } catch (error) {
        console.log(error)
        res.status(400).json({error : error.message})
    }
}


// search Pub
const searchPublication = async (req, res) => {
    const { page = 1, limit = 10, search = '' } = req.query
    const query = search ? { en_name: { $regex: search, $options: 'i' } } : { }
    try {
        const items = await Publication.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec()
        const count = await Publication.countDocuments(query)
        res.status(200).json({
            items,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    createPublication,
    getPublication,
    updatePublication,
    deletePublication,
    searchPublication
}