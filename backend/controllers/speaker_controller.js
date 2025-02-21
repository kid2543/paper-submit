const mongoose = require('mongoose')
const Conferences = require('../models/conferences')
const InvSpeaker = require('../models/inv_speaker')
const fs = require('fs')

// create single
const createInv = async (req, res) => {
    const { name, desc, keynote, confr_id } = req.body

    let emptyFileds = []

    if (!name) {
        emptyFileds.push('name')
    }

    if (!desc) {
        emptyFileds.push('desc')
    }

    if (!keynote) {
        emptyFileds.push('keynote')
    }

    if (!confr_id) {
        emptyFileds.push('confr id')
    }

    if (emptyFileds.length > 0) {
        return res.status(400).json({ error: 'กรุณาใส่ข้อมูลให้ครบ', emptyFileds })
    }

    if (!mongoose.Types.ObjectId.isValid(confr_id)) {
        return res.status(400).json({ error: 'รหัสงานประชุมไม่ถูกต้อง' })
    }

    try {
        const confr = await Conferences.findById(confr_id)
        if (!confr) {
            return res.status(400).json({ error: 'ไม่พบงานประชุม' })
        }
        const inv = await InvSpeaker.create({ name, desc, keynote, confr_id })
        res.status(201).json(inv)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// update inv
const updateInv = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'รหัสวิทยากรไม่ถูกต้อง' })
    }

    try {
        const inv = await InvSpeaker.findByIdAndUpdate(id, req.body, { new: true })
        if (!inv) {
            return res.status(400).json({ error: 'ไม่พบข้อมูล' })
        }
        res.status(200).json(inv)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// upload image
const uploadInvImage = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        fs.unlink(req.file.path, (err) => {
            if (err) {
                console.log('Error deleting the file:', err)
            }
            console.log("file is deleted")
        })
        return res.status(400).json({ error: 'รหัสวิทยากรไม่ถูกต้อง' })
    }

    if (!req.file) {
        fs.unlink(req.file.path, (err) => {
            if (err) {
                console.log('Error deleting the file:', err)
            }
            console.log("file is deleted")
        })
        return res.status(400).json({ error: 'ไม่พบไฟล์อัพโหลด' })
    }

    try {
        const { filename } = req.file
        const inv = await InvSpeaker.findByIdAndUpdate(id, { img: filename }, { new: true })
        res.status(200).json(inv)
    } catch (error) {
        fs.unlink(req.file.path, (err) => {
            if (err) {
                console.log('Error deleting the file:', err)
            }
            console.log("file is deleted")
        })
        res.status(400).json({ error: error.message })
    }
}

const uploadInvCv = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        fs.unlink(req.file.path, (err) => {
            if (err) {
                console.log('Error deleting the file:', err)
            }
            console.log("file is deleted")
        })
        return res.status(400).json({ error: 'รหัสวิทยากรไม่ถูกต้อง' })
    }

    if (!req.file) {
        fs.unlink(req.file.path, (err) => {
            if (err) {
                console.log('Error deleting the file:', err)
            }
            console.log("file is deleted")
        })
        return res.status(400).json({ error: 'ไม่พบไฟล์' })
    }

    try {
        const { filename } = req.file
        const inv = await InvSpeaker.findByIdAndUpdate(id, { cv: filename }, { new: true })
        res.status(200).json(inv)
    } catch (error) {
        fs.unlink(req.file.path, (err) => {
            if (err) {
                console.log('Error deleting the file:', err)
            }
            console.log("file is deleted")
        })
        res.status(400).json({ error: error.message })
    }
}

const deleteImage = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'รหัสวิทยากรไม่ถูกต้อง' })
    }

    try {
        const inv = await InvSpeaker.findById(id)
        if (!inv) {
            return res.status(400).json({ error: 'ไม่พบข้อมูล' })
        }
        if (!inv.img) {
            return res.status(400).json({ error: 'ไม่พบข้อมูลให้ลบ' })
        }
        fs.unlink("public/image/" + inv.img, (err) => {
            if (err) {
                return res.status(400).json({ error: err.message })
            }
        })
        await InvSpeaker.findByIdAndUpdate(id, { img: "" }, { new: true })
        res.status(200).json(InvSpeaker)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const deleteCv = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'รหัสวิทยากรไม่ถูกต้อง' })
    }

    try {
        const inv = await InvSpeaker.findById(id)
        if (!inv) {
            return res.status(400).json({ error: 'ไม่พบข้อมูล' })
        }
        if (!inv.cv) {
            return res.status(400).json({ error: 'ไม่พบข้อมูลให้ลบ' })
        }
        fs.unlink("public/pdf/" + inv.cv, (err) => {
            if (err) {
                return res.status(400).json({ error: err.message })
            }
        })
        const delInvCv = await InvSpeaker.findByIdAndUpdate(id, { cv: "" }, { new: true })
        res.status(200).json(delInvCv)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const removeInv = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'รหัสวิทยากรไม่ถูกต้อง' })
    }

    try {
        const find = await InvSpeaker.findById(id)
        if (!find) {
            return res.status(400).json({ error: 'ไม่พบข้อมูล' })
        }
        if (find.img) {
            fs.unlink("public/uploads/" + find.img, (err) => {
                if (err) {
                    console.log('ลบรูป วิทยากรไม่สำเร็จ',err)
                } else {
                    console.log('ลบไฟล์แล้ว')
                }
            })
        }
        if (find.cv) {
            fs.unlink("public/uploads/" + find.cv, (err) => {
                if (err) {
                    console.log('ลบไฟล์ cv ไม่สำเร็จ:', err)
                } else {
                    console.log('ลบไฟล์แล้ว')
                }
            })
        }
        await InvSpeaker.deleteOne({ _id: id })
        res.status(204).send('inv has delted')
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


// read inv
const getInv = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'รหัสงานประชุมไม่ถูกต้อง' })
    }

    try {
        const inv = await InvSpeaker.find({ confr_id: id })
        if (!inv) {
            return res.status(404).json({ error: 'Item not found' })
        }
        res.status(200).json(inv)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    createInv,
    updateInv,
    uploadInvImage,
    uploadInvCv,
    deleteImage,
    deleteCv,
    removeInv,
    getInv
}