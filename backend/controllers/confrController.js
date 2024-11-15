const mongoose = require('mongoose')
const Conferences = require('../models/conferences')


//create conference
const createConference = async (req, res) => {
    const {title, confr_code, confr_start_date, confr_end_date } = req.body

    const confrCode = confr_code.toUpperCase()
    const startDate = new Date(confr_start_date)
    const endDate = new Date(confr_end_date)

    const check = await Conferences.findOne({confr_code: confrCode})
    const { _id } = req.user

    if(check) {
       return res.status(400).json({error: 'รหัสงานประชุมนี้ถูกใช้ไปแล้ว'})
    }

    try {
 
        const confr = await Conferences.create({
            title,
            confr_code: confrCode,
            confr_start_date: startDate,
            confr_end_date: endDate,
            owner: _id
        })
        res.status(200).json(confr)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//edit conference
const editConference = async (req, res) => {

    const { _id } = req.body

    //check this is a id ?
    const check = mongoose.Types.ObjectId.isValid(_id)

    if(!check) {
        return res.status(400).json({error: "This is not id"})
    }

    try {
        const confr = await Conferences.findByIdAndUpdate(_id, req.body, {new: true})
        res.status(200).json(confr)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//get conference
const allConference = async (req, res) => {
    try {
        const confr = await Conferences.find({})
        res.status(200).json(confr)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//get open conference
const openConference = async (req, res) => {
    try {
        const confr = await Conferences.find({status: true})
        res.status(200).json(confr)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = { 
    createConference,
    editConference,
    allConference,
    openConference
 }