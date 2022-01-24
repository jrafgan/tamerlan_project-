const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdSchema = new Schema({
    imageUrls: {
        type: Array
    },
    adTitle: {
        type: String
    },
    price: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    phone: {
        type: String
    },
    user_id: {
        required: true,
        type: String
    },
    city: {
        type: String
    },
    shortDescription: {
        type: String
    },
    fullDescription: {
        type: String
    },
    selectedCategory: {
        type: String
    },
    selectedSubCategory: {
        type: String
    },
    moderated: {
        type: Boolean,
        default: false
    },
    paid: {
        type: Boolean,
        default: false
    },
    paidDays: {
        type: Number,
        default: 0
    },
});

const Ad = mongoose.model('Ad', AdSchema);

module.exports = Ad;