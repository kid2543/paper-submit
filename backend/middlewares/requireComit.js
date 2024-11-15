const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requireComit = async (req, res, next) => {

    // vertify authentication

    const { authorization } = req.headers

    if(!authorization) {
        return res.status(400).json({error: 'Authorization token required'})
    }

    const token = authorization.split(' ')[1]

    try {
        const { _id } = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findOne({_id, role: 'COMMITTEE'}).select('_id')
        if(!req.user) {
            return res.status(403).json({error: 'Need commitee role'})
        }
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({error: 'Request is not authorized'})
    }

}

module.exports = requireComit