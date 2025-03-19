const PaperFile = require('../models/paper_file')
const editPaperFile = require('../models/paper_edit')
const mongoose = require('mongoose')
const fs = require('fs')

// upload new file
const createPaperFile = async (req, res) => {
    const {
        paper_id,
        name
    } = req.body

    if (!req.file) {
        return res.status(400).json({ error: 'ไม่พบข้อมูลไฟล์' })
    }
    const { filename } = req.file

    if (!mongoose.Types.ObjectId.isValid(paper_id)) {
        fs.unlink(req.file.path, (err) => {
            if (err) {
                return res.status(400).json({ error: err })
            }
            console.log("Paper file deleted")
        })
        return res.status(400).json({ error: 'รหัสบทความไม่ถูกต้อง' })
    }
    try {
        const file = PaperFile.create({ paper_id, name, original_file: filename })
        res.status(201).json(file)
    } catch (error) {
        fs.unlink(req.file.path, (err) => {
            if (err) {
                return res.status(400).json({ error: err })
            }
            console.log("Paper file deleted")
        })
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}

const createCloseNameFile = async (req, res) => {
    const { _id } = req.body
    
    if(!req.file) {
        return res.status(400).json({error: "ไม่พบข้อมูลไฟล์"})
    }

    if(!mongoose.Types.ObjectId.isValid(_id)) {
        fs.unlink(req.file.path, (err) => {
            if(err) {
                return res.status(400).json("เกิดข้อผิดพลาดในการลบไฟล์")
            }
            console.log("file is deleted")
        })
        return res.status(400).json({error : "รหัสบทความไม่ถูกต้อง"})
    }

    const { filename } = req.file

    try {
        const check = await PaperFile.findById(_id)
        if(check.close_name_file) {
            fs.unlink('public/uploads/' + check.close_name_file, (err) => {
                if(err) {
                    console.log("เกิดข้อผิดพลาดเมื่อลบไฟล์ปิดชื่อ",err)
                } else {
                    console.log('ลบไฟล์สำเร็จ')
                }
            })
        }
        const file = await PaperFile.findByIdAndUpdate(_id, {close_name_file: filename}, { new : true })
        res.status(200).json(file)
    } catch (error) {
        console.log(error)
        res.status(400).json({error : error.message})
    }
}

// read file
const getPaperFile = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error : 'รหัสบทความไม่ถูกต้อง'})
    }

    try {
        const file = await PaperFile.find({paper_id : id})
        res.status(200).json(file)
    } catch (error) {
        console.log(error)
        res.status(400).json({error : error.message})
    }
}

// author upload edit file
const uploadEditFile = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error : 'รหัสไฟล์ไม่ถูกต้อง'})
    }
    
    if(!req.file) {
        return res.status(400).json({error : 'ไม่พบข้อมูลไฟล์'})
    }

    const { filename } = req.file

    try {
        // find file
        const file = await PaperFile.findById(id)
        if(!file) {
            return res.status(404).json({error : 'Item not found'})
        }
        // store old data
        await editPaperFile.create({original_file: file.original_file, close_name_file: file.close_name_file, file_id: file._id, name: file.name})

        //  fill new data
        file.original_file = filename
        file.close_name_file = ""
        file.save()
        res.status(200).json(file)
    } catch (error) {
        console.log(error)
        res.status(400).json({error : error.message})
    }
}

const readOriginalFile = async (req, res) => {
    const { id } = req.params
    const { read_original } = req.body

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error : 'รหัสไฟล์ไม่ถูกต้อง'})
    }

    try {
        const file = await PaperFile.findByIdAndUpdate(id, {read_original}, {new : true})
        if(!file) {
            return res.status(404).json({error : 'ไม่พบข้อมูลไฟล์'})
        }
        res.status(200).json(file)
    } catch (error) {
        res.status(400).json({error : error.message})
    }
}

module.exports = {
    createPaperFile,
    getPaperFile,
    createCloseNameFile,
    uploadEditFile,
    readOriginalFile
}