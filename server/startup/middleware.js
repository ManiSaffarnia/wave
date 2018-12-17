const bodyParser = require('body-parser');
const cookiParser = require('cookie-parser');

module.exports = app => {

    //body-parser
    app.use(bodyParser.urlencoded({ extended: false }));

    //json
    app.use(bodyParser.json());

    //cooki-parser
    app.use(cookiParser());
};