const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

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

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// Middleware runs just before save to database
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

module.exports = User