const editPaperFile = require('../models/paper_edit')
const mongoose = require('mongoose')
const fs = require('fs')

// upload new file
const createEditPaper = async (req, res) => {
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
        const file = editPaperFile.create({ paper_id, name, original_file: filename })
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

const getEditHistory = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error : 'รหัสบทความไม่ถูกต้อง'})
    }

    try {
        const edit = await editPaperFile.find({file_id: id})
        if(!edit) {
            return res.status(404).json({error : 'ไม่พบข้อมูล'})
        }
        res.status(200).json(edit)   
    } catch (error) {
        console.log(error)
        res.status(400).json({erorr: error.message})
    }
}

module.exports = {
    createEditPaper,
    getEditHistory
}