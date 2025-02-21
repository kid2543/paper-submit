const Template = require('../models/template')
const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')

// upload template
const uploadTemplate = async (req, res) => {
    const { name, confr_id } = req.body
    
    if(!mongoose.Types.ObjectId.isValid(confr_id)) {
        return res.status(400).json({error : 'รหัสงานประชุมไม่ถูกต้อง'})
    }
    
    if(!name) {
        return res.status(400).json({error : 'กรุณากรอกชื่อ template'})
    }
    
    if(!req.file) {
        return res.status(400).json({error : 'กรุณาเลือกไฟล์ก่อนอัพโหลด'})
    }

    const { filename } = req.file

    try {
        const template = await Template.create({
            name,
            file: filename,
            confr_id
        })
        res.status(201).json(template)
    } catch (error) {
        fs.unlinkSync(path.join(__dirname, '..', 'public', 'uploads', req.file.filename))
        res.status(400).json({error : error.message})
        console.log(error)
    }
}


// get all template
const allTemplate = async (req, res) => {
    try {
        const template = await Template.find()
        res.status(200).json(template)
    } catch (error) {
        res.status(400).json({error : error.message})
    }
}


// get template for conference
const getTemplate = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error : 'รหัสงานประชุมไม่ถูกต้อง'})
    }

    try {
        const template = await Template.find({confr_id : id})
        if(!template) {
            return res.status(404).json({error : 'item not found'})
        }
        res.status(200).json(template)
    } catch (error) {
        res.status(400).json({error : error.message})
    }
}


// delete template
const deleteTemplate = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error : 'รหัส template ไม่ถูกต้อง'})
    }

    try {
        const find = await Template.findById(id)
        if(!find) {
            return res.status(404).json({error : 'Item not found'})
        }
        fs.unlink('public/uploads/' + find.file, (err) => {
            if(err) {
                console.log('ลบไฟล์ เทมเพลท ไม่สำเร็จ', err)
            } else {
                console.log('ไฟล์ลบแล้ว')
            }
        })
        await Template.deleteOne({_id : id})
        res.status(204).send('file is deleted')
    } catch (error) {
        res.status(400).json({errro : error.message})
    }
}


module.exports = {
    uploadTemplate,
    allTemplate,
    getTemplate,
    deleteTemplate
}