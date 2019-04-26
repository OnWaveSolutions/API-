const mongoose = require('mongoose');
const state = ['active', 'suspended']
const adminSchema = new mongoose.Schema({
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
    lastLogin: {
        type: Date,
        default: null
    }
}, { versionKey: false })
const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;