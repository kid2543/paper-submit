
// model and lib
const mongoose = require('mongoose')
const Notification = require('../models/notification')
const User = require('../models/user')
const Conferences = require('../models/conferences')
const jwt = require('jsonwebtoken')
const Paper = require('../models/paper')

const bcrypt = require('bcrypt')
const validator = require('validator')

const createToken = (_id, role) => {
    return jwt.sign({ _id, role }, process.env.JWT_SECRET, { expiresIn: '1d' })
}

// auth for navigate
const authForNavigate = async (req, res) => {
    const { _id } = req.user

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ error: "รหัสผู้ใช้งานไม่ถูกต้อง" })
    }

    try {
        const user = await User.findById(_id).select('_id role')
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// login user
const loginUser = async (req, res) => {
    const { username, password } = req.body

    try {
        const maxAge = 1000 * 60 * 60 * 24
        const user = await User.login(username, password)
        const token = createToken(user._id, user.role)
        res.cookie('authToken', token, { httpOnly: true, maxAge })
        res.status(200).send('Login success')
    } catch (error) {
        res.status(400).json({ error: error.message })
        console.log(error)
    }

}

// signup user
const signupUser = async (req, res) => {
    const { username, password, role, name, email } = req.body

    try {
        const user = await User.signup(username, password, role, email, name)
        if (!user)
            return res.status(400).json({ error: user })
        res.status(201).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

// admin create host
const createHost = async (req, res) => {
    const { username, password, name, email } = req.body
    const role = 'HOST'

    try {
        const user = await User.signup(username, password, role)
        user.name = name
        user.email = email
        await user.save()
        res.status(201).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// create committee
const createCommittee = async (req, res) => {
    const { username, password, name, email } = req.body
    const role = 'COMMITTEE'

    try {
        const user = await User.signup(username, password, role)
        user.name = name
        user.email = email
        await user.save()
        res.status(201).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// get committee
const getCommittee = async (req, res) => {
    try {
        const user = await User.find({ role: 'COMMITTEE' }).select('-password')
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


// admin get host info
const getHost = async (req, res) => {
    try {
        const host = await User.find({ role: 'HOST' }).select('-password')
        res.status(200).json(host)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// admin get all user
const getAll = async (req, res) => {
    try {
        const all = await User.find({ role: { $ne: 'ADMIN' } }).select('name role username')
        res.status(200).json(all)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// pagination and search user
const searchHost = async (req, res) => {
    const { page = 1, limit = 10, search = '' } = req.query
    const query = search ? { username: { $regex: search, $options: 'i' }, role: 'HOST' } : { role: 'HOST' }
    try {
        const items = await User.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec()
        const count = await User.countDocuments(query)
        res.status(200).json({
            items,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// search committee
const searchComit = async (req, res) => {
    const { page = 1, limit = 10, search = '' } = req.query
    const query = search ? { username: { $regex: search, $options: 'i' }, role: 'COMMITTEE' } : { role: 'COMMITTEE' }
    try {
        const items = await User.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec()
        const count = await User.countDocuments(query)
        res.status(200).json({
            items,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// search author
const searchAuthor = async (req, res) => {
    const { page = 1, limit = 10, search = '' } = req.query
    const query = search ? { username: { $regex: search, $options: 'i' }, role: 'AUTHOR' } : { role: 'AUTHOR' }
    try {
        const items = await User.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec()
        const count = await User.countDocuments(query)
        res.status(200).json({
            items,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// delete host
const adminDelete = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'รหัสผู้ใช้งานไม่ถูกต้อง' })
    }

    try {
        await User.deleteOne({_id: id})
        res.status(204).send('ลบผู้ใช้งานแล้ว')
    } catch (error) {
        res.status(400).json({error : error.message})
    }
}

const getOwnerDetail = async (req, res) => {
    const { _id } = req.user

    try {
        const user = await User.findById(_id).select('-password')
        if (!user) {
            return res.status(404).json({ error: 'ไม่พบผู้ใช้งาน' })
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// admin get user detail
const adminViewUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'รหัสผู้ใช้งานไม่ถูกต้อง' })
    }

    try {
        const user = await User.findById(id).select('-password')
        if (!user) {
            return res.status(404).json({ error: 'ไม่พบผู้ใช้งาน' })
        }
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}

// update user detail
const updateUser = async (req, res) => {
    const { id } = req.params
    const value = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'รหัสผู้ใช้งานไม่ถูกต้อง' })
    }

    try {
        const user = await User.findByIdAndUpdate(id, value, { new: true }).select('-password')
        if (!user) {
            return res.status(404).json({ error: 'ไม่พบผู้ใช้งาน' })
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const userUpdateDetail = async (req, res) => {
    const { _id } = req.user

    try {
        const user = await User.findByIdAndUpdate(_id, req.body, {new: true})
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(400).json({error : error.message})
    }
}

// change password
const changePassword = async (req, res) => {
    const { old_password, new_password } = req.body
    const { _id } = req.user

    if (!validator.isStrongPassword(new_password)) {
            return res.status(400).json({error: 'รหัสผ่านไม่แข็งแรงพอ'})
        }

    try {
        const user = await User.findById(_id)
        if(!user) {
            return res.status(404).json({error: 'ไม่พบข้อมูลผู้ใช้งาน'})
        }

        const match = await bcrypt.compare(old_password, user.password)

        if (!match) {
            res.status(400).json({error: 'รหัสผ่านเดิมไม่ถูกต้อง'})
        }

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(new_password, salt)
        user.password = hash
        user.save()
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(400).json({error : error.message})
    }
}

module.exports = {
    loginUser,
    signupUser,
    createHost,
    createCommittee,
    getHost,
    getCommittee,
    searchHost,
    searchComit,
    searchAuthor,
    adminDelete,
    authForNavigate,
    getOwnerDetail,
    getAll,
    adminViewUser,
    updateUser,
    userUpdateDetail,
    changePassword
}