const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: {
        type: String,
        required: true,
    },
    username: String,
    weekly: Number,
    totalCredits: Number,
}, {
    timestamps: true
})

// https://www.geeksforgeeks.org/mongoose-mongoose-model-function/
//First argument: name of the model. the method pluraizes the name and looks for a collection matching "users"
const UserRoll = mongoose.model("Roll_test", userSchema);

module.exports = UserRoll;