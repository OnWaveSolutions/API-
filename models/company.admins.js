const mongoose = require('mongoose');
const CompanyAdminSchema = new mongoose.Schema({
    adminID: {
        type: Number
    },
    companyID: {
        type: Number
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
    updatedBY: {
        type: String
    }
}, { versionKey: false })
const CompanyAdmin = mongoose.model('CompanyAdmin', CompanyAdminSchema);
module.exports = CompanyAdmin;