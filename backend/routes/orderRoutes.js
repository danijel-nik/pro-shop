const express = require('express')
const router = express.Router()
const { addOrderItems, getOrderByID } = require('../controllers/orderController')
const { protect } = require('../middleware/authMiddleware')

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
router.route('/').post(protect, addOrderItems)

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
router.route('/:id').get(protect, getOrderByID)

module.exports = router