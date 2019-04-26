const mongoose = require('mongoose');
const state = ['awaiting activation','active', 'suspended']
const managerSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    user: String,
    password: String,
    state: {
        type: String,
        default: state[0]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    monthlyFee: {
        type: Number,
        default: 0
    },
    paymentDate: {
        type: Date,
        default: Date.now
    },
    whatsapp: {
        type: Number,
        default: 8296642799
    },
    cellphone: {
        type: Number,
        default: 8296642799
    },
    telephone: {
        type: Number
    },
    cedula: {
        type: Number
    },
    address: {
        type: String
    },
    company: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});



const Manager = mongoose.model('Manager', managerSchema);
module.exports = Manager;