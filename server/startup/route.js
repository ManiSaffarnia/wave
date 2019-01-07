const usersRoute = require("../routes/users");
const productRoute = require("../routes/products");
const brandRoute = require("../routes/brand");
const woodRoute = require("../routes/wood");
const paymentRoute = require("../routes/payment");
const rootPath = path.dirname(process.mainModule.filename);

module.exports = app => {


    //dynamic
    app.use("/api/users", usersRoute); // User's routes
    app.use("/api/products", productRoute); // Product's routes
    app.use("/api/brands", brandRoute); // Brand's routes
    app.use("/api/woods", woodRoute); // Wood's routes
    app.use("/api/payment", paymentRoute); // Wood's routes

    //static
    if (process.env.NODE_ENV === 'production') {
        const path = require('path');
        app.use(express.static(path.resolve(rootPath, 'client', 'build')));
        app.get("*", (req, res) => {
            res.sendFile(path.resolve(rootPath, 'client', 'build', 'index.html'));
        });
    }
};