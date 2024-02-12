// import dependencies
const mongoose = require('mongoose')


const soundbar = new mongoose.Schema({
    brand: {
        type: String, 
        enum: ['Samsung', 'LG', 'Sony', 'Bose', 'JBL', 'Sonos', 'other'], 
        required: true
    },
    model: {
        type: String, 
        required: true
    },
    image: { 
        type: String, 
        required: true 
    },
    channels: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    dolbyAtmos: {
        type: Boolean,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
}, { timestamps: true })

module.exports = soundbar
