const mongoose = require('mongoose');

const doubtSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    topic: {
        type: String
    },
    doubt: {
        type: String
    },
    method: {
        type: String,
        enum: ["audio_call", "video_call"]
    },
    status: {
        type: String,
        enum: ["pending", "accepted"],
        default: "pending"
    }
}, {timestamps: true});

const Doubt = mongoose.model('Doubt', doubtSchema);

module.exports = Doubt;