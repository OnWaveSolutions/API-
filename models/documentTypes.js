const mongoose = require('mongoose');
const documentTypeSchema = new mongoose.Schema({
    type: {
        type: String
    },
    value: {
        type: String
    }
}, { versionKey: false })
const DocumentType = mongoose.model('DocumentType', documentTypeSchema);
module.exports = DocumentType;