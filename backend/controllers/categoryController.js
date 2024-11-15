const Category = require('../models/category')
const mongoose = require('mongoose')

// create category
const createCategory = async (req, res) => {

    const { category_code, name, confr_id, desc } = req.body

    const cateCode = category_code.toUpperCase()

    console.log("category code", cateCode)

    const exists = await Category.findOne({ category_code: cateCode })

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
            category_code: cateCode,
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

    let check = []

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(400).json({error: "ไม่ใช่รหัสหัวข้อ"})
    }

    if (hasDuplicates(list)) {
        return res.status(400).json({ error: 'พบข้อมูลซ้ำ' })
    }

    for(let i in list) {
        if(!mongoose.Types.ObjectId.isValid(list[i])){
            check.push(list[i])
        }
    }

    if(check.length > 0) {
        return res.status(400).json({error: 'พบข้อมูลที่ไม่ใช่รหัสกรรมการ', check})
    }

    try {
        const category = await Category.findByIdAndUpdate(
            _id,
            {
                reviewer_list: list
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

module.exports = {
    createCategory,
    listReviewer
}