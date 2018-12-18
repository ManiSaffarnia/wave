const express = require('express');
const router = express.Router();
const { Brand } = require('../models/Brand');
const _ = require('lodash');

//middlewares
const asynchMiddleware = require("../middlewares/asynch-middleware");
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');


//@route   POST api/brands/addBrand
//@desc    Add a new brand
//@access  private route
//@required-data  name
router.post('/addBrand', auth, admin, asynchMiddleware(async (req, res) => {
    //1-TODO: input validation

    //2-Create a new Brand
    const brand = new Brand(_.pick(req.body, ['name']));

    //3-check for duplicate brand name
    const duplicateBrand = Brand.findOne({ name: req.body.name });
    if (duplicateBrand) return res.status(400).json({ success: false, error: "this Brand has already exists" });

    //4-add to database
    await brand.save();

    //5-send response
    res.status(200).json({
        success: true,
        brandData: {
            name: brand.name,
            id: brand.id
        }
    })
}));//end

/*************************************************************************************************/

//@route   GET api/brands/all
//@desc    get all brands
//@access  public route
router.get('/all', asynchMiddleware(async (req, res) => {
    const brands = await Brand.find().sort({ name: 1 }).select('name');

    //2-send response
    res.status(200).json({
        success: true,
        brands
    });
}));//end

/*************************************************************************************************/
module.exports = router