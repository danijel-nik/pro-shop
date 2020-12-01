const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
    name: { type: String, reqired: true },
    rating: { type: Number, reqired: true },
    comment: { type: String, reqired: true }
}, {
    timestamps: true
})

const productSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        reqired: true,
        unique: true
    },
    image: {
        type: String,
        reqired: true,
        unique: true
    },
    brand: {
        type: String,
        reqired: true
    },
    category: {
        type: String,
        reqired: true
    },
    description: {
        type: String,
        reqired: true
    },
    reviews: [reviewSchema],
    rating: {
        type: Number,
        reqired: true,
        default: 0
    },
    numReviews: {
        type: Number,
        reqired: true,
        default: 0
    },
    price: {
        type: Number,
        reqired: true,
        default: 0
    },
    countInStock: {
        type: Number,
        reqired: true,
        default: 0
    }

}, {
    timestamps: true
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product