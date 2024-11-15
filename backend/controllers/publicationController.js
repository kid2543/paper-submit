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

    if(!desc) {
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
        const find = await Publication.findById(id)
        if(!find) {
            return res.status(404).json({error : 'ไม่พบข้อมูล'})
        }
        await Paper.updateMany({publication: id}, { $set: {publication: null}})
        await Conference.updateMany({ publication : id }, { $pull: {publication : id}})
        await Publication.deleteOne({_id : id})
        res.status(204).send("item has deleted")
    } catch (error) {
        console.log(error)
        res.status(400).json({error : error.message})
    }
}

module.exports = {
    createPublication,
    getPublication,
    updatePublication,
    deletePublication
}