const paperAssign = require('../models/paper_assign')
const mongoose = require('mongoose')

//assign paper
const assignPaper = async (req, res) => {
    const { reviewer, paper_id } = req.body
    let check = []

    if (!mongoose.Types.ObjectId.isValid(reviewer)) {
        return res.status(400).json({ error: 'This is not reviewer id' })
    }

    if (!mongoose.Types.ObjectId.isValid(paper_id)) {
        return res.status(400).json({ error: 'This is not paper id' })
    }

    check = await paperAssign.find({ reviewer, paper_id, status: { $ne: 'CANCEL' } })

    if (check.length > 0) {
        return res.status(400).json({ error: 'บทความนี้ได้ถูกมอบหมายให้กรรมการแล้ว' })
    }

    try {
        const assign = await paperAssign.create({ reviewer, paper_id })
        res.status(200).json(assign)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

// review the paper
const reviewPaper = async (req, res) => {
    const {
        _id,
        suggestion,
        rate,
        total,
        result
    } = req.body

    let empty = []

    console.log("req", req)

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ error: 'รหัสการให้คะแนนไม่ถูกต้อง' })
    }

    const check = paperAssign.findById(_id)

    if (!check) {
        return res.status(400).json({ error: 'ไม่พบข้อมูล' })
    }

    if (!suggestion) {
        empty.push('suggestion')
    }

    if (!rate) {
        empty.push('rate')
    }

    if (!total) {
        empty.push('total')
    }

    if (!result) {
        empty.push('result')
    }

    if (empty.length > 0) {
        return res.status(400).json({ error: 'กรุณากรอกข้อมูลให้ครบ', empty })
    }

    if (req.file) {
        try {
            const { filename } = req.file
            const review = await paperAssign.findByIdAndUpdate(
                _id,
                {
                    status: "SUCCESS",
                    suggestion,
                    suggestion_file: filename,
                    rate,
                    total,
                    result
                },
                { new: true, runValidators: true }
            )
            res.status(200).json(review)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    } else {
        try {
            const review = await paperAssign.findByIdAndUpdate(
                _id,
                 {
                    status: "SUCCESS",
                    suggestion,
                    rate,
                    total,
                    result
                 },
                { new: true, runValidators: true }
            )
            res.status(200).json(review)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
}

// read paper review
const readReview = async (req, res) => {
   const { paper_id } = req.params

   if(!mongoose.Types.ObjectId.isValid(paper_id)) {
        return res.status(400).json({error: 'ไม่ใช่รหัสบทความ'})
   }

   try {
        const review = await paperAssign.find({paper_id}).populate('reviewer', 'name')

        if (!review) {
            return res.status(400).json({error: 'Item not found'})
        }

        res.status(200).json(review)
   } catch (error) {
        res.status(400).json({error: error.message})
   }
}

module.exports = {
    assignPaper,
    reviewPaper,
    readReview
}