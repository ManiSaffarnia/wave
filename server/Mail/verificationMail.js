const nodemailer = require('nodemailer');
require('dotenv').config();

module.exports = async (email, verificationurl) => {
    console.log(verificationurl);
    //create transporter
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            type: "OAuth2",
            user: process.env.EMAIL_USERNAME,
            clientId: process.env.EMAIL_CLIENT_ID,
            clientSecret: process.env.EMAIL_CLIENT_SECRET,
            refreshToken: process.env.EMAIL_REFRESH_TOKEN
        }
    });

    //mail config
    const mailOptions = {
        from: `"Waves" <${process.env.EMAIL_USERNAME}>`, // sender address
        to: `${email}`, // list of receivers
        subject: 'Email Verification', // Subject line
        //text: 'Hello world?', // plain text body
        html: `<p>Welcome to our community. Please click this <a href=${verificationurl}>Verification Link</a><p>` // html body
    };

    // send mail with defined transport object
    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log("EMAIL ERROR! ", error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    });

};


