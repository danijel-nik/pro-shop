const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const connectDB = require('./config/db')
// Routes
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
// Middlewares
const errorMiddleware = require('./middleware/errorMiddleware')

dotenv.config()

// MongoDB connection
connectDB()

// App initialization
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('API is running...');
})

// Routes
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

// Custom middlewares
// Error handling
app.use(errorMiddleware.notFound)

app.use(errorMiddleware.errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold))
