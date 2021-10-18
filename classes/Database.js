const mongoose = require('mongoose');

class Database {

    #mongoSRV;  //set this to a private variable so we cant access it directly

    constructor (mongoSRV) {
        this.#mongoSRV = mongoSRV;
    }

    #activeMongoSRV(){  //use a private method so we can only use this within the class
        return this.#mongoSRV;
    }

    //starts the connection to the database
    start () {
        mongoose.connect(this.#activeMongoSRV(),{
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