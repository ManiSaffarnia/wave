const express = require('express');
const bodyParser = require('body-parser');
const cookiParser = require('cookie-parser');
const cloudinary = require('cloudinary');
require('dotenv').config();

module.exports = app => {

    //body-parser
    app.use(bodyParser.urlencoded({ extended: false }));

    //json
    app.use(bodyParser.json());

    //cooki-parser
    app.use(cookiParser());


    //cloudinary 
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET
    })

};