const express = require('express');
const router = express.Router();
const { Wood } = require('../models/Wood');
const _ = require('lodash');

//middlewares
const asynchMiddleware = require("../middlewares/asynch-middleware");
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');


//@route   POST api/woods/addWood
//@desc    add a new wood
//@access  private route
//@required-data  name
router.post('/addWood', auth, admin, asynchMiddleware(async (req, res) => {
    //1-TODO: input validation

    //2-create a new Wood
    const wood = new Wood(_.pick(req.body, ['name']));

    //3-check for duplicate wood name
    const duplicateWood = await Wood.findOne({ name: req.body.name });
    if (duplicateWood) return res.status(400).json({ success: false, error: "this wood has already exists" });

    //4-add to database
    await wood.save();

    //5-send response
    res.status(200).json({
        success: true,
        woodData: {
            name: wood.name,
            id: wood.id
        }
    })
}));//end

/*************************************************************************************************/

//@route   GET api/woods/all
//@desc    get all brands
//@access  public route
router.get('/all', asynchMiddleware(async (req, res) => {
    const woods = await Wood.find().sort({ name: 1 }).select('name');

    //2-send response
    res.status(200).json({
        success: true,
        woods
    });
}));//end

/*************************************************************************************************/
module.exports = router