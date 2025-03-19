const InvSpeaker = require('../models/inv_speaker')
const mongoose = require('mongoose')


const checkInvImageUpload = async (req, res, next) => {
    const { id } = req.params
    const upload = req.file && req.file.filename || null

    if(!upload) {
        return res.status(400).json({error: 'Upload file is null'})
    }

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error : 'รหัสวิทยากรไม่ถูกต้อง'})
    }

    try {
        const inv = await InvSpeaker.findById(id)
        if(!inv) {
            return res.status(400).json({error: 'ไม่พบข้อมูล'})
        }
        if(inv.img) {
            return res.status(400).json({error: 'ลบรูปอันเดิมก่อนทำการอัปโหลดใหม่'})
        }
        next()
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

const checkInvCvUpload = async (req, res, next) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error : 'รหัสวิทยากรไม่ถูกต้อง'})
    }

    try {
        const inv = await InvSpeaker.findById(id)
        if(!inv) {
            return res.status(400).json({error: 'ไม่พบข้อมูล'})
        }
        if(inv.cv) {
            return res.status(400).json({error: 'ลบข้อมูลเดิมก่อนทำการอัปโหลดใหม่'})
        }
        next()
    } catch (error) {
        res.status(400).json({error : error.message})
    }
}

module.exports = {
    checkInvImageUpload,
    checkInvCvUpload
}