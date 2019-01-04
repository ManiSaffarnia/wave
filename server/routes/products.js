const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Product } = require('../models/Product');
const _ = require('lodash');
//Middlewares
const asynchMiddleware = require("../middlewares/asynch-middleware");
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
//Helper
const getFilters = require('../helper/readFilter');

//@route   POST api/products/addProduct
//@desc    create a new product
//@access  private route
//@required-date  name/description/price/brand/wood/shipping/available/frets/publish
router.post('/addProduct', auth, admin, asynchMiddleware(async (req, res) => {
    //1-TODO: input validation

    //2-create new brand
    const data = {}
    const product = new Product(req.body);

    //3-save in database
    await product.save();

    //4-send response
    res.json({
        success: true,
        productData: {
            id: product.id,
            name: product.name
        }
    })
}));

/*************************************************************************************************/

//@route   GET api/products/article_by_id?id=[ids]&type=[sigle,array]
//@desc    Fetch a product by id OR some products by Array of ids
//@access  public route
//@required-date  id
router.get('/article_by_id', asynchMiddleware(async (req, res) => {
    //1-TODO: input validation - id validation
    const type = req.query.type
    let items = req.query.id;

    if (type === "array") {
        const ids = items.split(',');
        items = [];
        items = ids.map((id) => {
            return mongoose.Types.ObjectId(id)
        });
    }

    const products = await Product.find({ '_id': { $in: items } }).populate('brand', ['name']).populate('wood', ['name']).exec();
    if (products.length === 0) return res.json({ success: false })

    return res.json({
        success: true,
        productData: [
            ...products
        ]
    })

}));//end

/*************************************************************************************************/

//@route   GET api/products/articles?sortBy=createdAt&order=desc&limit=4
//OR
//@route   GET api/products/articles?sortBy=sold&order=desc&limit=4
//@desc    Fetch a certain amount of product with their CREATED_AT 
//@access  public route
router.get('/articles', asynchMiddleware(async (req, res) => {
    //1-TODO: input validation - id validation


    const order = req.query.order || "asc";
    const sortBy = req.query.sortBy || "_id";
    const limit = parseInt(req.query.limit) || 4;

    //Fetch from database
    const products = await Product.find().populate('brand', ['name']).populate('wood', ['name']).sort([[sortBy, order]]).limit(limit);
    return res.json({
        success: true,
        products
    })

}));//end

/*************************************************************************************************/

//@route   POST api/products/shop
//@desc    Fetch products by filter 
//@access  public route
router.post('/shop', asynchMiddleware(async (req, res) => {
    //1-TODO: input validation

    const order = req.body.order || "desc";
    const sortBy = req.body.sortBy || "_id";
    const limit = parseInt(req.body.limit) || 100;
    const skip = parseInt(req.body.skip);
    const filters = getFilters(req.body.filters);

    //Fetch from database
    const products = await Product.find(filters).populate('brand', ['name']).populate('wood', ['name']).sort([[sortBy, order]]).skip(skip).limit(limit).exec();
    return res.json({
        success: true,
        articles: products,
        size: products.length
    })

    res.status(200);

}));//end

/*************************************************************************************************/

module.exports = router