const mongoose = require('mongoose');

const constantScheme = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },  
    phone:{
        type: String,
        required: true
    }
});

const Contact = mongoose.model('Contact', constantScheme);

module.exports = Contact;