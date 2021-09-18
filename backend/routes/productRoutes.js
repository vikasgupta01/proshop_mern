import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

const router = express.Router()

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.get('/', expressAsyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
}))

// @desc    Fetch single product
// @route   GET /api/products
// @access  Public
router.get('/:id', expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.json(product)
    } else {
        res.status(404).json({ message: 'Product not found' })
    }
}))

export default router
