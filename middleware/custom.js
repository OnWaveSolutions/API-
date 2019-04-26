const Roles = require('../models/roles');
const { to, ReR, ReS } = require('../services/util.service');

let roles = async function (req, res, next) {
    let roles_id, err, app;
    roles_id = req.params.role_id;
    
    [err, company] = await to(Roles.findOne({_id:roles_id}));
    if (err) return ReE(res, "Error fetching roles");

    if(!roles) return ReE(res, `Role not found with id: ${roles_id}`);
    let user, users_array;
    user = req.user;
    users_array = company.users.map(obj => String(obj.user));

    if(!users_array.includes(String(user._id))) return ReE(res, `User does not have permission to read app with id: ${app_id}`);
    req.role = roles;
    next();
}

module.exports.roles = roles;