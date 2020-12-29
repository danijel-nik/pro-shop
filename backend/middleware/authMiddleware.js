const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
    let token = req.headers.authorization

    if (token && token.startsWith('Bearer')) {
        console.log(req.headers.authorization)

        try {
            const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET)
            console.log(decoded)

            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Not authorized, token failed')
        }

    } else {
        console.log('token not found')
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401)
        throw new Error('Not authorized as an admin')
    }
}

module.exports = { protect, admin }