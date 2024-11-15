const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requireAdmin = async (req, res, next) => {

    // verify authentication
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' })
    }

    const token = authorization.split(' ')[1]

    try {
        const { _id } = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findOne({ _id, role: 'ADMIN' }).select('_id')
        if(!req.user) {
            return res.status(403).json({error: 'Require admin role'})
        }

        next()

    } catch (error) {
        res.status(401).json({ error: 'Request is not authorized' })
    }

}

module.exports = requireAdmin