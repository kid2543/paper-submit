const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requireHost = async (req, res, next) => {

    // verify authentication
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({error: 'Authorization token required'})
    }
    
    const token = authorization.split(' ')[1]

    try {
        const { _id } = jwt.verify(token, process.env.JWT_SECRET)
        if(!_id) {
            return res.status(400).json({error : 'Token หมดอายุ'})
        }
        req.user = await User.findOne({ _id, $or: [{role: 'ADMIN'}, {role: 'HOST'}] }).select('_id')
        if(!req.user) {
            return res.status(403).json({error: 'Need admin and host role'})
        }
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({error: 'Request is not authorized'})
    }

}

module.exports = requireHost