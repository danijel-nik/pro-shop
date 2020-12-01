const mongoose = require('mongoose')
const { cyan } = require('colors')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_DB, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })
        console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline)
    } catch (err) {
        console.log(`Error: ${err.message}`.red.underline.bold)
        process.exit(1)
    }
}

module.exports = connectDB