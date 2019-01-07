const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

//user schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 80,
        minlength: 2,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        maxlength: 80,
        minlength: 2,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        maxlength: 255,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 255
    },
    cart: {
        type: Array,
        default: []
    },
    record: {
        type: Array,
        default: []
    },
    token: {
        type: String,
        default: null
    },
    isActive: {
        type: Boolean,
        default: false
    },
    role: {
        type: Number,
        default: 0
    },
    registerDate: {
        type: Date,
        default: Date.now
    }
});


//Hash Passwrod before save a user
userSchema.pre('save', async function (next) {
    //faghat zamani ke password avaz mishod ya set mishod in kar ro bokone
    if (this.isModified('password')) {
        try {
            const salt = await bcrypt.genSalt(15);
            const hashedPassword = await bcrypt.hash(this.password, salt);

            this.password = hashedPassword;
            next();
        }
        catch (err) {
            return next(err);
        }
    }
});


//user Methods

//1-CHECK PASSWORD
userSchema.methods.checkPassword = async function (enteredPassword) {
    const isMatch = await bcrypt.compare(enteredPassword, this.password);
    return isMatch;
};

//2-GENERATE TOKEN
userSchema.methods.generateToken = function () {
    return jwt.sign({ id: this.id, name: this.name + ' ' + this.lastname }, process.env.JWT_SECRET, { expiresIn: "1d" }); //bad 1 rooz expire beshe
};

//user model
const User = mongoose.model('user', userSchema);

//exports
module.exports = {
    userSchema,
    User
};