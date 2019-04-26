const mongoose = require('mongoose');
const UserCommunicationSchema = new mongoose.Schema({
    typeId: {
        type: Number
    },
    userId: {
        type: Number
    },
    value: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    },
    createdAtBy: {
        type: String
    },
    UpdatedBy: {
        type: String
    }
}, { versionKey: false })
const UserCommunication = mongoose.model('UserCommunication', UserCommunicationSchema);
module.exports = UserCommunication;