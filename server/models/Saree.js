// models/Saree.js
const mongoose = require('mongoose');

const sareeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    thumbnailImages: [{
        type: String,
        required: false,
    }],
    category: {
        type: String,
        required: true,
        enum: ['Synthetic', 'Cotton', 'Shalu', 'Zari', 'Fancy'], // Valid categories
    },
    uploadDate: {
        type: Date,
        default: Date.now.toLocaleString(),
    },
});

const Saree = mongoose.model('Saree', sareeSchema);

module.exports = Saree;
