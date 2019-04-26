const mongoose = require('mongoose');
const ApartmentSchema = new mongoose.Schema({
    number: {
        type: String
    },
    floor: {
        type: String
    },
    mt2: {
        type: String
    },
    vacancy: {
        type: Boolean
    },
    maintenanceRate: {
        type: mongoose.Decimal128
    },
    tenantId: {
        type: Number
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    },
    createdAtBy: {
        type: Date
    },
    updatedAtBy: {
        type: Date
    }
}, { versionKey: false })
const Apartment = mongoose.model('Apartment', ApartmentSchema);
module.exports = Apartment;