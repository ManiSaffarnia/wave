
const usersRoute = require("../routes/users");
const productRoute = require("../routes/products");
const brandRoute = require("../routes/brand");
const woodRoute = require("../routes/wood");
const paymentRoute = require("../routes/payment");

module.exports = app => {

    //static

    //dynamic
    app.use("/api/users", usersRoute); // User's routes
    app.use("/api/products", productRoute); // Product's routes
    app.use("/api/brands", brandRoute); // Brand's routes
    app.use("/api/woods", woodRoute); // Wood's routes
    app.use("/api/payment", paymentRoute); // Wood's routes

};