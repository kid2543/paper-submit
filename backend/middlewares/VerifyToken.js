const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.cookies.authToken

    if(!token) {
        return res.status(403).json({error : 'Authorization token required'})
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) {
            return res.status(401).send('Unauthorized')
        }
        req.user = decoded
        next()
    })
}

module.exports = verifyToken