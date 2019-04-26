const mongoose = require('mongoose');
const rolesSchema = new mongoose.Schema({
    roles: [{
        role: {
            type: mongoose.Schema.ObjectId, ref: 'Roles'
        },
        permissions: [{
            type: String
        }] 
    }]
}, { versionKey: false, timestamps: true })

rolesSchema.methods.toWeb = function() {
    let json = this.toJSON();
    json.id = this._id;
    return json;
}
const Roles = mongoose.model('Roles', rolesSchema);
module.exports = Roles;