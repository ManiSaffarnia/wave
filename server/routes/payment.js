const express = require('express');
const ZarinpalCheckout = require('zarinpal-checkout');
const mongoose = require('mongoose');
const router = express.Router();
const { User } = require('../models/User');
const { Product } = require('../models/Product');
const _ = require('lodash');

//middlewares
const asynchMiddleware = require("../middlewares/asynch-middleware");
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

//initiate
const zarinpal = ZarinpalCheckout.create('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', true);

//@route   POST api/payment/PaymentRequest
//@desc    payment
//@access  Private route
router.get("/PaymentRequest", asynchMiddleware(async (req, res) => {
    zarinpal.PaymentRequest({
        Amount: '1000', //toman
        CallbackURL: 'http://localhost:4000/api/payment/PaymentVerification',
        Description: 'test from wave',
        Email: 'elnino1370@gmail.com',
        Mobile: '09120000000'
    }).then(function (response) {
        console.log(response);
        console.log(response.url)
        if (response.status == 100) {
            res.redirect(response.url);
        }
    }).catch(function (err) {
        console.log(err);
    });

}));//END REGISTER


router.get('/PaymentVerification/:amount/:token', function (req, res) {
    zarinpal.PaymentVerification({
        Amount: req.params.amount,
        Authority: req.params.token,
    }).then(function (response) {
        if (response.status == 101) {
            console.log(response)
            console.log("Verified! Ref ID: " + response.RefID);
        } else {
            console.log('inja');
            console.log(response);
        }
    }).catch((err) => {
        console.log(err);
    });
});


router.get('/UnverifiedTransactions', function (req, res) {
    zarinpal.UnverifiedTransactions().then(function (response) {
        if (response.status == 100) {
            console.log(response.authorities);
        }
    }).catch(function (err) {
        console.log(err);
    });
});



router.get('/RefreshAuthority/:expire/:token', function (req, res) {
    zarinpal.RefreshAuthority({
        Authority: req.params.token,
        Expire: req.params.expire
    }).then(function (response) {
        if (response.status == 100) {
            res.send('<h2>You can Use: <u>' + req.params.token + '</u> — Expire in: <u>' + req.params.expire + '</u></h2>');
        }
    }).catch(function (err) {
        console.log(err);
    });
});


/**************************************************************************************************/
//export router
module.exports = router;