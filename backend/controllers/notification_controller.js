const Notification = require('../models/notification')
const mongoose = require('mongoose')

// getAll
const getAllNotification = async (req, res) => {
    const { _id } = req.user
    const { user_id } = req.body

    try {
        if(!user_id) {
            const notification = await Notification.find({user_id: _id})
            return res.status(200).json(notification)
        } else {
            const notification = await Notification.find({user_id})
            return res.status(200).json(notification)
        }

    } catch (error) {
        res.status(400).json({error : error.message})       
    }
}

// read notification
const readNotification = async (req, res) => {
    const { _id } = req.user
    const { user_id } = req.body
    
    try {
        if(!user_id) {
            const noti = await Notification.updateMany({user_id: _id, status: false}, {status: true}, {new: true})
            res.status(200).json(noti)
        } else {
            const noti = await Notification.updateMany({user_id, status: false}, {status: true}, {new: true})
            res.status(200).json(noti)
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({error : error.message})        
    }
}

// clear all notification
const clearNotification = async (req, res) => {
    const { _id } = req.user
    const { user_id } = req.body

    try {
        if(!user_id) {
            await Notification.deleteMany({user_id: _id})
            return res.status(204).send('Notification is deleted')
        } else {
            await Notification.deleteMany({user_id})
            return res.status(204).send('Notification is deleted')
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({error : error.message})
    }
}

module.exports = {
    getAllNotification,
    readNotification,
    clearNotification
}