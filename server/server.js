const express = require('express');

//create an express app
const app = express();

//connect to database
require("./startup/database")();

//middlewares
require("./startup/middleware")(app);

//routes
require('./startup/route')(app);


//define port and listen to it
require('./startup/port')(app);