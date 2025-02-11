const Category = require('../models/category')
const Paper = require('../models/paper')
const mongoose = require('mongoose')

// create category
const createCategory = async (req, res) => {

    const { category_code, name, confr_id, desc } = req.body

    const exists = await Category.findOne({ category_code })

    if (exists) {
        return res.status(400).json({ error: 'รหัสหัวข้อมีผู้ใช้งานแล้ว' })
    }

    if (!mongoose.Types.ObjectId.isValid(confr_id)) {
        return res.status(400).json({ error: 'หมายเลขงานประชุมไม่ถูกต้อง' })
    }

    let empty = []

    if (!category_code) {
        empty.push("รหัสหัวข้อ")
    }

    if (!name) {
        empty.push('ชื่อหัวข้อ')
    }

    if (empty.length > 0) {
        return res.status(400).json({ error: 'กรุณากรอกข้อมูลให้ครบ', empty })
    }

    try {
        const category = await Category.create({
            category_code,
            name,
            confr_id,
            desc
        })
        res.status(200).json(category)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// create reviewer list
const listReviewer = async (req, res) => {
    const { _id, list } = req.body

    const hasDuplicates = (arr) => arr.length !== new Set(arr).size;

    let check = 0
    let newList = []

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(400).json({error: "ไม่ใช่รหัสหัวข้อ"})
    }

    if (hasDuplicates(list)) {
        return res.status(400).json({ error: 'พบข้อมูลซ้ำ' })
    }

    for(let i in list) {
        if(!mongoose.Types.ObjectId.isValid(list[i]._id)){
            check = check + 1
        } else {
            newList.push(list[i]._id)
        }
    }

    if(check > 0) {
        return res.status(400).json({error: 'พบข้อมูลที่ไม่ใช่รหัสกรรมการ'})
    }

    try {
        const category = await Category.findByIdAndUpdate(
            _id,
            {
                reviewer_list: newList
            },
            {
                new: true
            }
        )
        res.status(200).json(category)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


// read form conference
const getCateforConfr = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error : 'รหัสงานประชุมไม่ถูกต้อง'})
    }

    try {
        const cate = await Category.find({confr_id : id})
        res.status(200).json(cate)
    } catch (error) {
        res.status(400).json({error : error.message})
    }
}


// update
const updateCategory = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error : 'รหัสหัวข้อไม่ถูกต้อง'})
    }

    try {
        const cate = await Category.findByIdAndUpdate(id, req.body, { new : true })
        res.status(200).json(cate)
    } catch (error) {
        res.status(400).json({error : error.message})
    }
}


// read one cate
const getOneCategory = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error : 'รหัสหัวข้อไม่ถูกต้อง'})
    }

    try {
        const cate = await Category.findById(id).populate('reviewer_list', 'name _id username')
        if(!cate) {
            return res.status(404).json({error : 'ไม่พบข้อมูล'})
        }
        res.status(200).json(cate)
    } catch (error) {
        res.status(400).json({error : error.message})
    }
}

// delete
const deleteCategory = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error : 'รหัสหัวข้องานประชุมไม่ถูกต้อง'})
    }

    try {
        // เช็คว่ามีบทความส่งมาแล้วหรือไม่
        const paper = await Paper.find({cate_code: id, status: {$ne: 'CANCEL'}})
        if(paper.length > 0) {
            return res.status(400).json({error : 'มีบทความอยู่ระหว่างการดำเนินการ ไม่สามารถลบได้'})
        }
        await Category.deleteOne({_id : id})
        res.status(202).send('ลบหัวข้องานประชุมแล้ว')
    } catch (error) {
        res.status(400).json({error : error.message})
    }
}

module.exports = {
    createCategory,
    listReviewer,
    getCateforConfr,
    getOneCategory,
    updateCategory,
    deleteCategory
}