const paperAssignHistory = require('../models/paper_assign_history')
const mongoose = require('mongoose')
const fs = require('fs')

//read history
const readHistory = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error : "Invalid id"})
    }

    try {
        const history = await paperAssignHistory.find({review_id: id})
        res.status(200).json(history)
    } catch (error) {
        console.log(error)
        res.status(400).json({error : error.message})
    }
}


module.exports = {
    readHistory
}