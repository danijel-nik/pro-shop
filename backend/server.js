const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')
const connectDB = require('./config/db')
// Routes
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes')
const uploadRoutes = require('./routes/uploadRoutes')
// Middlewares
const errorMiddleware = require('./middleware/errorMiddleware')

dotenv.config()

// MongoDB connection
connectDB()

// App initialization
const app = express()

// Shows requested endpoint with status in console
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json())

// Routes
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

// Get PayPal client ID
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

// const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(path.resolve(), '/uploads')))

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(path.resolve(), '/frontend/build')))
    app.get('*', (req, res) => res.sendFile(path.resolve(path.resolve(), 'frontend', 'build', 'index.html')))
} else {
    app.get('/', (req, res) => {
        res.send('API is running...');
    })
}

// Custom middlewares
// Error handling
// app.use(errorMiddleware.notFound)

app.use(errorMiddleware.errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold))
