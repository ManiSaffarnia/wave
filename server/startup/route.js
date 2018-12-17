const usersRoute = require("../routes/users");

module.exports = app => {

    app.use("/api/users", usersRoute); //user's route

};