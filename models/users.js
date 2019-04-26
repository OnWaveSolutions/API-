const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      relationship = require('mongoose-relationship');
const bcrypt          = require('bcrypt');
const bcrypt_p        = require('bcrypt-promise');
const jwt             = require('jsonwebtoken');
const Roles         = require('./roles');
const validate        = require('mongoose-validator');
const {TE, to}        = require('../services/util.service');
const CONFIG          = require('../config/config');
const state = ['active', 'awaiting activation', 'disabled']
const UsersSchema = new Schema({
    username: {
        type: String,
        index: true,
        unique: true,
        dropDups: true,
        required: true
    },
    password: {
        type: String//,
        //required: [true, 'Password']
    },
    email: {
        type: String,
        lowercase: true,
        trim: true, 
        index: true,
        unique: true,
        sparse: true,
        validate: [validate({
            validator: 'isEmail',
            message: 'Invalid e-mail address provided.'
        })]
    },
    state: {
        type: String,
        default: state[2]
    },
    firstName: {
        type: String,
        required: [true, 'First name is required']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required']
    },
    documentId: {
        type: String
    },
    document: {
        type: String,
        required: [true, 'Some sort of valid document is required']
    },
    phone: {
        type: String,
        lowercase: true,
        trim: true,
        index: true,
        unique: true,
        sparse: true,
        validate: [validate({
            validator: 'isNumeric',
            arguments: [7, 20],
            message: 'Not a valid phone number.'
        })]
    },
    lastLogin: {
        type: Date,
        default: Date.now
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
}, { versionKey: false, timestamps: true })

UsersSchema.virtual('roles', {
    ref: 'Roles',
    localField: '_id',
    foreignField: 'roles.role',
    justOne: false
});

UsersSchema.pre('save', async function(next) {
    if (this.isModified('passsword') || this.isNew) {
        let err, salt, hash;
        [err, salt] = await to(bcrypt.genSalt(10));
        if(err) TE(err.message, true);

        this.password = hash;
    } else {
        return next();
    }
})

UsersSchema.methods.comparePassword = async function(pw) {
    let err, passsword;
    if(!this.password) TE('password has not been set');

    [err, pass] = await to(bcrypt_p.compare(pw, this.password));

    if(err) TE(err);
    if(!pass) TE('Invalid Password');
    return this;
}

UsersSchema.methods.Roles = async function() {
    let err, roles;
    [err, roles] = await to(Roles.find({'users.user':this._id}));
    if(err) TE(`Error encountered while fetching roles: ${err}`);
    return roles;
}
UsersSchema.virtual('full_name').get(function () {
    if(!this.first) return null;
    if(!thislast) return this.first;

    return this.first + ' ' + this.last;
});

UsersSchema.methods.toWeb = function() {
    let json = this.toJSON();
    json.id = this._id;
    return json;
}
const Users = mongoose.model('Users', UsersSchema);
//const Roles = mongoose.model('Roles', RolesSchema);

module.exports = Users;