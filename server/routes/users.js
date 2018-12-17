const express = require('express');
const router = express.Router();
const { User } = require('../models/User');

//middlewares
const asynchMiddleware = require("../middlewares/asynch-middleware");
const auth = require('../middlewares/auth');


//@route   POST api/users/register
//@desc    Register a new User
//@access  Public route
//@required-date  name/email/password
router.post("/register", asynchMiddleware(async (req, res) => {
    //1-input validation
    // const { errors, isValid } = registerValidation(req.body);

    // if (!isValid) {
    //     return res.status(400).json({
    //         ...errors
    //     });
    // }

    //2-check email existance
    //4-create user data
    const userData = req.body;

    //5-create a new User
    const user = new User(userData);
    console.log(user);

    //6-save user in database
    try {
        await user.save();
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            error: err
        })
    }

    //7-send response to the user
    res.status(200).json({
        success: true,
        userData: {
            name: user.name,
            email: user.email,
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


    const email = req.body.email;
    const password = req.body.password;

    //2-check user in database
    const user = await User.findOne({ email });
    if (!user) {
        return res
            .status(400)
            .json({
                loginSuccess: false,
                error: 'Email OR Password is WRONG!'
            });
    }

    //3-check password
    const isMatch = await user.checkPassword(password);
    if (!isMatch) { //username va password ghalat boode va bayad error bargardoonim
        return res
            .status(400)
            .json({
                loginSuccess: false,
                error: 'Email OR Password is WRONG!'
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
            email: user.email
        }
    })

}));//END LOGIN

/**************************************************************************************************/

//@route   GET api/users/logout
//@desc    Log OUT User
//@access  Private route
//@required-date  none
router.get('/logout', auth, asynchMiddleware(async (req, res) => {

}));




router.get('/auth', auth, asynchMiddleware(async (req, res) => {

    userID = req.user.id

    const user = await User.findById(userID)

    res.json({
        ...user
    })
}));







/**************************************************************************************************/
//export router
module.exports = router;