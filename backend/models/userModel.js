const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        reqired: true,
        unique: true
    },
    email: {
        type: String,
        reqired: true,
        unique: true
    },
    password: {
        type: String,
        reqired: true
    },
    isAdmin: {
        type: Boolean,
        reqired: true,
        default: false
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User