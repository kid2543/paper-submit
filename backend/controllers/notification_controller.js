const { createNotification } = require('../middlewares/notification')
const Notification = require('../models/notification')
const mongoose = require('mongoose')


// create notification
const createNewNotification = async (req, res) => {
    const {
        user_id,
        title,
        message
    } = req.body


    if(!mongoose.Types.ObjectId.isValid(user_id)) {
        return res.status(400).json({error : 'รหัสผู้ใช้งานไม่ถูกต้อง'})
    }

    try {
        const noti = await Notification.create({
            user_id,
            title,
            message
        })
        res.status(201).json(noti)
    } catch (error) {
        res.status(400).json({error : error.message})
    }
}

// getAll
const getAllNotification = async (req, res) => {
    const { _id } = req.user
    const { user_id } = req.body

    try {
        if (!user_id) {
            const notification = await Notification.find({ user_id: _id }).sort({'createdAt': -1})
            return res.status(200).json(notification)
        } else {
            const notification = await Notification.find({ user_id }).sort({'createdAt': -1})
            return res.status(200).json(notification)
        }

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// read notification
const readNotification = async (req, res) => {
    const { _id } = req.user
    const { user_id } = req.body

    try {
        if (!user_id) {
            const noti = await Notification.updateMany({ user_id: _id, status: false }, { status: true }, { new: true })
            res.status(200).json(noti)
        } else {
            const noti = await Notification.updateMany({ user_id, status: false }, { status: true }, { new: true })
            res.status(200).json(noti)
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}

// confr read notification
const getConfrNotification = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'รหัสงานประชุมไม่ถูกต้อง' })
    }

    try {
        const noti = await Notification.find({ user_id: id }).sort({'createdAt': -1})
        res.status(200).json(noti)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// clear all notification
const clearNotification = async (req, res) => {
    const { _id } = req.user
    const { user_id } = req.body

    try {
        if (!user_id) {
            await Notification.deleteMany({ user_id: _id })
            return res.status(204).send('Notification is deleted')
        } else {
            await Notification.deleteMany({ user_id })
            return res.status(204).send('Notification is deleted')
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getAllNotification,
    readNotification,
    clearNotification,
    getConfrNotification,
    createNewNotification
}