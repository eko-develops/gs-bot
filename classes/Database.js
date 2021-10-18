const mongoose = require('mongoose');

class Database {

    #mongoSRV;

    constructor (mongoSRV) {
        this.#mongoSRV = mongoSRV;
    }

    #activeMongoSRV(){
        return this.#mongoSRV;
    }

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