const express = require('express')
const router = express.Router()
const { protect, admin } = require('../middleware/authMiddleware')
const { getProducts, getProductById, deleteProduct } = require('../controllers/productController')

router
    .route('/')
    .get(getProducts)

router
    .route('/:id')
    .get(getProductById)
    .delete(protect, admin, deleteProduct)

module.exports = router