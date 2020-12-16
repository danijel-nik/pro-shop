const express = require('express')
const router = express.Router()
const { addOrderItems } = require('../controllers/orderController')
const { protect } = require('../middleware/authMiddleware')

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
router.route('/').post(protect, addOrderItems)

module.exports = router