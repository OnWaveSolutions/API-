const mongoose = require('mongoose'),
      Schema = mongoose.Schema
const CondominiumSchema = new Schema({
    name: {
        type: String
    },
    address: {
        type: String
    },
    latitude: {
        type: mongoose.Decimal128
    },
    longitude: {
        type: mongoose.Decimal128
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: String
    },
    updatedBy: {
        type: String
    },
    manager: [{ type: Schema.Types.ObjectId, ref: 'Users'}]
}, { versionKey: false })

const RolesSchema = new mongoose.Schema({
    value: {
        type: String
    },
    type: {
        type: String
    }
}, { versionKey: false })

const Condominium = mongoose.model("Condominium", CondominiumSchema);

