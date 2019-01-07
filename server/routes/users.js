const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { User } = require('../models/User');
const { Product } = require('../models/Product');
const _ = require('lodash');
const formidable = require('express-formidable');
const cloudinary = require('cloudinary');

//email
const sendVerificationEMail = require('../Mail/verificationMail');

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
    const id = mongoose.Types.ObjectId();
    const userData = _.pick(req.body, ['name', 'lastname', 'email', 'password', 'passwordConfirm']);
    userData._id = id;
    userData.token = await jwt.sign({ user: { id } }, process.env.JWT_SECRET);
    const user = new User(userData);

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

    //send verification email
    const url = (process.env.NODE_ENV === 'production') ? `https://mani-waves.herokuapp.com/api/users/verification/${userData.token}` : `http://localhost:4000/api/users/verification/${userData.token}`;
    await sendVerificationEMail(user.email, url);

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

    //4-check user activition
    if (!user.isActive) {
        return res
            .json({
                loginSuccess: false,
                error: 'Your email is not verified. please check your email.',
                errorType: 'all'
            });
    }

    //5-generate token
    const token = user.generateToken();

    //6-set generated token inside cookie, and send response - mitoonam local storage ham estefade konam mesle poroje devyabam
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
//@route   Get /api/users/removeFromCart
//@desc    remove an item from cart
//@access  private route
router.get('/removeFromCart', auth, asynchMiddleware(async (req, res) => {
    const userID = req.user.id;
    const productID = req.query.id;

    //check user existance
    const user = await User.findById(userID)
    if (!user) return res.status(400).json({ isAuth: false, error: true, errorMessage: "user not found" });

    //update the cart inside database
    const updatedUser = await User.findOneAndUpdate(
        { _id: userID },
        {
            $pull: {
                cart: {
                    id: mongoose.Types.ObjectId(productID),
                }
            }
        },
        { new: true }
    );


    const newCartArray = updatedUser.cart.map(item => (mongoose.Types.ObjectId(item.id)));

    const productsDetail = await Product.find({ '_id': { $in: newCartArray } }).populate('brand').populate('wood').exec();

    return res.json({ success: true, cart: updatedUser.cart, cartDetail: productsDetail });
}));

/**************************************************************************************************/
//@route   GET api/users/verification/:token
//@desc    verify user email address
//@access  Private
router.get('/verification/:token', asynchMiddleware(async (req, res) => {
    //take token from req.params
    const { token } = req.params;
    if (!token) return res.status(400).send('There is no token');

    try {
        //decode token
        const decodeUser = jwt.verify(token, process.env.JWT_SECRET);

        //find user by this id
        const user = await User.findById(decodeUser.user.id);

        if (user.token === token) {
            //delete token from db and active user
            const updatedUser = await User.findByIdAndUpdate(user.id, { $set: { token: null, isActive: true } }, { new: true });

            //redirect
            res.redirect((process.env.NODE_ENV === 'production') ? 'https://mani-waves.herokuapp.com/register_login' : 'http://localhost:3000/register_login');
        }
        else {
            return res.status(400).send('Tokens are not match');
        }
    }
    catch (err) {
        res.status(400).send('token not verified');
    }
}));//END

/**************************************************************************************************/
//export router
module.exports = router;