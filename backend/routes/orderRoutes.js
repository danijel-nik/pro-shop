const express = require('express')
const router = express.Router()
const { addOrderItems, getOrderByID, updateOrderToPaid, getMyOrders } = require('../controllers/orderController')
const { protect } = require('../middleware/authMiddleware')

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
router.route('/').post(protect, addOrderItems)

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
router.route('/myorders').get(protect, getMyOrders)

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
router.route('/:id').get(protect, getOrderByID)

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
router.route('/:id/pay').put(protect, updateOrderToPaid)

module.exports = router