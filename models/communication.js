const mongoose = require('mongoose');
const CommunicationSchema = new mongoose.Schema({
    value: {
        type: String
    },
    type: {
        type: String
    }
}, { versionKey: false })
const Communication = mongoose.model('Communication', CommunicationSchema);
module.exports = Communication;