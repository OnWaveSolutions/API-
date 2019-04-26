const mongoose = require('mongoose');
const CompaniesSchema = new mongoose.Schema({
    name: {
        type: String
    },
    documentId: {
        type: String
    },
    document: {
        type: String
    },
    phone: {
        type: String
    },
    state: {
        type: String,
        default: state[2]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    },
    createdBy: {
        type: String
    },
    updatedBy: {
        type: String
    }
}, { versionKey: false })
const Companies = mongoose.model('Companies', CompaniesSchema);
module.exports = Companies;