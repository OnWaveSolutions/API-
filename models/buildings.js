const mongoose = require('mongoose');
const BuildingSchema = new mongoose.Schema({
    condominiumId: {
        type: Number
    },
    name: {
        type: String
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
const Building = mongoose.model('Building', BuildingSchema);
module.exports = Building;