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
        html:
            (`
        <table class="table" cellpadding="0" cellspacing="0" style="background-color: #eee; empty-cells: hide; margin: 0 auto; padding: 0; width: 600px;">
                   <tr>
                       <td style="background-color: #999592; margin: 0 auto;">
                           <h1 style="box-sizing: border-box; color: white; font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px; text-align: center; text-transform: uppercase;">Waves</h1></td>
                   </tr>
                   <tr>
                       <td style="margin: 0 auto;padding: 15px 25px;box-sizing: border-box">
                            <h2>Welcome</h2>
                            <p>Please click this link to verify your email:</p>
                            <a href=${verificationurl}>Verification Link</a>
                       </td>
                   </tr>
                   <tr>
                        <td style="background-color: #999592; margin: 0 auto;">
                                <p style="box-sizing: border-box; color: white; font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px; text-align: center; text-transform: uppercase;font-size:10px">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p></td>
                   </tr>
        </table>
        `)
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


