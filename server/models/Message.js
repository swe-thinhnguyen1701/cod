const {Schema, model} = require('mongoose');

const messageSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    message: {
        type: String,
        required: true,
        trim: true,
        maxLength: 2000
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Message = model('Message', messageSchema);
module.exports = Message;