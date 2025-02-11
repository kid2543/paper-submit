const Partner = require('../models/partner')
const mongoose = require('mongoose')
const fs = require('fs')
const Conference = require('../models/conferences')

// upload partner
const createPartner = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'ไม่พบข้อมูล' })
    }

    const { filename } = req.file
    const { confr_id, desc } = req.body

    if (!mongoose.Types.ObjectId.isValid(confr_id)) {
        return res.status(400).json({ error: 'รหัสงานประชุมไม่ถูกต้อง' })
    }

    try {
        const confr = await Conference.findById(confr_id)
        if (!confr) {
            return res.status(404).json({ error: 'ไม่พบงานประชุม' })
        }
        const partner = await Partner.create({ confr_id, desc, image: filename })
        res.status(201).json(partner)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


// delete partner
const deletePartner = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'หมายเลขไม่ถูกต้อง' })
    }

    try {
        const find = await Partner.findById(id)
        if (!find) {
            return res.status(404).json({ error: 'ไม่พบข้อมูล' })
        }
        fs.unlink(`public/uploads/${find.image}`, (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('ลบไฟล์สำเร็จ')
            }
        })
        await find.deleteOne()
        res.status(204).send("file has remove ")
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


// read partner
const getPartner = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error : 'รหัสงานประชุมไม่ถูกต้อง'})
    }

    try {
        const partner = await Partner.find({confr_id: id})
        if(!partner) {
            return res.status(404).json({error : 'Items not found'})
        }
        res.status(200).json(partner)
    } catch (error) {
        res.status(400).json({error : error.message})
    }
}


module.exports = {
    createPartner,
    deletePartner,
    getPartner
}