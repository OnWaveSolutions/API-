const { User }      = require('../models');
const validator     = require('validator');
const { to, TE }    = require('../services/util.service')

const getUniqueKeyFromBody = function(body) {
    let unique_key = body.unique_key;
    if(typeof unique_key==='undefined'){
        if(typeof body.email != 'undefined') {
            unique_key = body.email
        } else if(typeof body.phone != 'undefined') {
            unique_key = body.phone
        } else{
            unique_key = null;
        }
    }
    return unique_key;
}

const createUser = async function(userInfo){
    let unique_key, auth_info, err;
    auth_info={}
    auth_info.status='create';
    unique_key = getUniqueKeyFromBody(userInfo);
    if(!unique_key) TE('An email or phone number was not entered.');
    if(validator.isEmail(unique_key)){
        auth_info.method = 'email';
        userInfo.email = unique_key;
        [err, user] = await to(User.create(userInfo));
        if(err) TE('user already exists with that email');
        return user;
    }else if(validator.isMobilePhone(unique_key, 'any')){
        auth_info.method = 'phone';
        userInfo.phone = unique_key;
        [err, user] = await to(User.create(userInfo));
        if(err) TE('user already exists with that phone number');
        return user;
    }else{
        TE('A valid email or phone number was not entered.');
    }
}
module.exports.createUser = createUser;
module.exports.getUniqueKeyFromBody = getUniqueKeyFromBody;
