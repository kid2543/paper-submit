
// model and lib
const mongoose = require('mongoose')
const Notification = require('../models/notification')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const createToken = (_id, role) => {
   return jwt.sign({_id, role}, process.env.JWT_SECRET, { expiresIn: '1d' })
}

// login user
const loginUser = async (req, res) => {
    const {username, password} = req.body

    try {
        const user = await User.login(username, password)

        const token = createToken(user._id, user.role)

        res.status(200).json({username, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

// signup user
const signupUser = async (req, res) => {
    const {username, password, role} = req.body

    try {
        const user = await User.signup(username, password, role)

        //create token
        const token = createToken(user._id, user.role)

        res.status(201).json({username, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

// admin create host
const createHost = async (req, res) => {
    const { username, password } = req.body
    const role = 'HOST'

    try {
        const user = await User.signup(username, password, role)
        res.status(201).json(user)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// create committee
const createCommittee = async (req, res) => {
    const { username, password } = req.body
    const role = 'COMMITTEE'

    try {
        const user = await User.signup(username, password, role)
        res.status(201).json(user)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


// delete user
const deleteUser = async (req, res) => {
    const { _id } = req.body
    try {
        const find = User.findById(_id) 
        if(!find) {
            return res.status(404).json({error : 'Item not found'})
        }
        await User.deleteOne({ _id })
        res.status(200).send("deleted")
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


// admin get host info
const getHost = async (req, res) => {
    try {
        const host = await User.find({role: 'HOST'}).select('-password')
        res.status(200).json(host)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


// get notification
const getUserNotification = async (req, res) => {
    const { _id } = req.user

    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({error : 'รหัสผู้ใช้งานไม่ถูกต้อง'})
    }

    try {
        const data = await Notification.find({ userId: _id })
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({error : error.message})
    }
}

module.exports = { 
    loginUser, 
    signupUser, 
    createHost,
    createCommittee,
    getHost,
    deleteUser,
    getUserNotification
 }