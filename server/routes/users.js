const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { User } = require('../models/User');
const _ = require('lodash');
const formidable = require('express-formidable');
const cloudinary = require('cloudinary');

//middlewares
const asynchMiddleware = require("../middlewares/asynch-middleware");
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
//Validators
const loginValidation = require('../validation/login');
const registerValidation = require('../validation/register');



//@route   POST api/users/register
//@desc    Register a new User
//@access  Public route
//@required-date  name/lastname/email/password
router.post("/register", asynchMiddleware(async (req, res) => {
    //1-input validation
    const { errors, isValid } = registerValidation(_.pick(req.body, ['name', 'lastname', 'email', 'password', 'passwordConfirm']));

    if (!isValid) return res.status(400).json({ success: false, ...errors, errorType: 'one' });

    //2-check email existance
    const checkUser = await User.findOne({ email: req.body.email });
    if (checkUser) return res.status(400).json({ success: false, error: "This email has been taken" });


    //3-create a new User
    const userData = _.pick(req.body, ['name', 'lastname', 'email', 'password', 'passwordConfirm']);
    const user = new User(userData);
    //console.log(user);

    //4-save user in database
    try {
        await user.save();
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            error: err
        })
    }

    //5-send response to the user
    res.status(200).json({
        success: true,
        userData: {
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            id: user.id
        }
    })

}));//END REGISTER

/**************************************************************************************************/

//@route   POST api/users/login
//@desc    Login a User with email & password
//@access  Public route
//@required-date  email/password
router.post('/login', asynchMiddleware(async (req, res) => {
    //1-input validation
    const { isValid, errors } = loginValidation(_.pick(req.body, ['email', 'password']));
    if (!isValid) return res.status(400).json({ loginSuccess: false, ...errors });

    const email = req.body.email;
    const password = req.body.password;

    //2-check user in database
    const user = await User.findOne({ email });
    if (!user) {
        return res
            .status(400)
            .json({
                loginSuccess: false,
                error: 'Email OR Password is WRONG!',
                errorType: 'all'
            });
    }

    //3-check password
    const isMatch = await user.checkPassword(password);
    if (!isMatch) { //username va password ghalat boode va bayad error bargardoonim
        return res
            .status(400)
            .json({
                loginSuccess: false,
                error: 'Email OR Password is WRONG!',
                errorType: 'all'
            });
    }

    /*
    *TODO - check for email verification
    */


    //4-generate token
    const token = user.generateToken();

    //5-set generated token inside cookie, and send response - mitoonam local storage ham estefade konam mesle poroje devyabam
    res.cookie('x-auth-token', token).status(200).json({
        loginSuccess: true,
        userData: {
            id: user._id,
            name: user.name,
            lastname: user.lastname,
            email: user.email
        }
    })

}));//END LOGIN

/**************************************************************************************************/
//@route   GET api/users/auth
//@desc    check user authentication
//@access  Public route
router.get('/auth', auth, asynchMiddleware(async (req, res) => {
    userID = req.user.id

    const user = await User.findById(userID)
    if (!user) return res.status(400).json({ isAuth: false, error: true, errorMessage: "user not found" });

    res.json({
        loginSuccess: true,
        userData: {
            id: user._id,
            isAdmin: user.role === 0 ? false : true,
            isAuth: true,
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            role: user.role,
            cart: user.cart,
            history: user.history
        }
    })
}));


/**************************************************************************************************/
//@route   POST api/users/uploadimage
//@desc    Upload image
//@access  private route
router.post('/uploadimage', auth, admin, formidable(), asynchMiddleware(async (req, res) => {

    cloudinary.uploader.upload(req.files.file.path, (result) => {
        console.log(result);
        res.status(200).send({
            public_id: result.public_id,
            url: result.url
        });

    }, {
            public_id: `${Date.now()}`,
            resource_type: 'auto'
        })
}));

/**************************************************************************************************/
//@route   GET /api/users/removeimage?public_id=${id}
//@desc    DELETE an Upload image
//@access  private route
router.get('/removeimage', auth, admin, asynchMiddleware(async (req, res) => {
    const public_id = req.query.public_id;
    cloudinary.uploader.destroy(public_id, (error, result) => {
        if (error) return res.json({ success: false });

        res.status(200).json({ success: true });
    })
}));

/**************************************************************************************************/
//@route   Post /api/users/addToCart
//@desc    Add product to their cart
//@access  private route
router.post('/addToCart', auth, asynchMiddleware(async (req, res) => {
    const userID = req.user.id;
    const productID = req.query.productID;
    let isDuplicate = false;

    console.log(productID)

    const user = await User.findById(userID)
    if (!user) return res.status(400).json({ isAuth: false, error: true, errorMessage: "user not found" });

    //check duplication
    user.cart.forEach(product => {
        if (product.id.toString() === productID) isDuplicate = true
    });


    if (isDuplicate) {
        const updatedUser = await User.findOneAndUpdate(
            { _id: userID, "cart.id": mongoose.Types.ObjectId(productID) },
            {
                $inc: {
                    "cart.$.quantity": 1
                }
            },
            { new: true }
        );

        return res.json({ success: true, cart: updatedUser.cart });
    }//end if 
    else {
        const updatedUser = await User.findOneAndUpdate(
            { _id: userID },
            {
                $push: {
                    cart: {
                        id: mongoose.Types.ObjectId(productID),
                        quantity: 1,
                        date: Date.now()
                    }
                }
            },
            { new: true }
        );

        return res.json({ success: true, cart: updatedUser.cart });
    }//end else


}));


/**************************************************************************************************/
//export router
module.exports = router;