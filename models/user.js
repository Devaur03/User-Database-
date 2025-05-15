const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/database_maker1');

const userSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
});

const userModel = mongoose.model('User', userSchema);
module.exports = userModel; 
