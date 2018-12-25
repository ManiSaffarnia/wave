const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    //const token = req.header('x-auth-token'); //baraye kar ba token dakhel header

    const token = req.cookies['x-auth-token'];

    if (!token) return res.json({ isAuth: false, error: true, errorMessage: "not Authenticated" });

    try {//token ro estekhraj mikonam va mirizan toye property (user) az object (req)
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    }
    catch (ex) {
        res.status(400).json({ msg: 'token ghalate kolanm. hackeri sheytoon?! Mikhay goolam bezani?' });
    }

};