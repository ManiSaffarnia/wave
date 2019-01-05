const mongoose = require('mongoose');
require('dotenv').config();


module.exports = () => {
    //database uri
    const databaseURI = process.env.DATABASE_URI;

    //PRODUCTION ENVIRONMENT
    if (process.env.NODE_ENV === 'production') {
        mongoose
            .connect(databaseURI, { useNewUrlParser: true })
            .then(() => {
                console.log("connected to the db...");
            })
            .catch(error => {
                console.log(
                    `there is a problem with connecting to the database: ${error}`
                );
                throw new Error(`Mani! there is a problem with connecting to the database: ${error}`);
            });
    }
    //DEVELOPMENT ENVIRONMENT
    else {
        mongoose
            .connect(databaseURI, { useNewUrlParser: true })
            .then(() => {
                console.log("connected to the db...");
            })
            .catch(error => {
                console.log(
                    `there is a problem with connecting to the database: ${error}`
                );
                throw new Error(`Mani! there is a problem with connecting to the database: ${error}`);
            });
    }
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);

};