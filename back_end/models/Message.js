const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    fromUserId: {
        type: String,
        required: true
    },
    fromUsername: {
        type: String,
        required: true
    },
    toUserId: {
        type: String,
    },
    toUsername: {
        type: String,
    },
    newMsg: {
        type: Boolean,
        default: true
    },
    imageUrls: {
        type: Array
    },
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;