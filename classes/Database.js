const mongoose = require('mongoose');

class Database {

    //starts the connection to the database
    static start (mongoSRV) {
        mongoose.connect(mongoSRV,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        })
        .then( ()=> {
            console.log('Successfully connected to MongoDB!');
        })
        .catch( (err) => {
            console.log('Error connecting to MongoDB', err);
        });
    }

}

module.exports = Database;