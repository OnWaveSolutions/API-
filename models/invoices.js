const mongoose = require('mongoose');
const InvoiceSchema = new mongoose.Schema({
    postDate: {
        type: Date
    },
    apartmentId: {
        type: Number
    },
    amount: {
        type: Number
    },
    paid: {
        type: Number
    },
    transactionDate: {
        type: Date
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
const Invoice = mongoose.model('Invoice', InvoiceSchema);
module.exports = Invoice;