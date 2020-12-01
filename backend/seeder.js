const mongoose = require('mongoose')
const dotenv = require('dotenv')
const colors = require('colors')
// Dummy data
const users = require('./data/users')
const products = require('./data/products')
// Models
const User = require('./models/userModel')
const Product = require('./models/productModel')
const Order = require('./models/orderModel')

const connectDB = require('./config/db')

dotenv.config()

connectDB()

const importData = async () => {
    try {
        // Clear data
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        // Insert data
        const createdUsers = await User.insertMany(users)

        const adminUser = createdUsers[0]._id

        const sampleProducts = products.map(product => {
            return { ...product, user: adminUser }
        })

        await Product.insertMany(sampleProducts)

        console.log('Data imported!'.green.inverse)

    } catch (err) {
        console.log(`${err}`.red.inverse)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        // Clear data
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        console.log('Data destroyed!'.red.inverse)

    } catch (err) {
        console.log(`${err}`.red.inverse)
        process.exit(1)
    }
}

// Check flag in console command
if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}