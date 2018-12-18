const express = require('express');
const router = express.Router();
const { Product } = require('../models/Product');
const _ = require('lodash');

//middlewares
const asynchMiddleware = require("../middlewares/asynch-middleware");
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');


//@route   POST api/products/addProduct
//@desc    create a new product
//@access  private route
//@required-date  name/description/price/brand/wood/shipping/available/frets/publish
router.post('/addProduct', auth, admin, (req, res) => {
    //1-TODO: input validation

    //2-create new brand
    const data = {}
    const product = new Product()
    res.json({ message: 'add product' });
});



module.exports = router