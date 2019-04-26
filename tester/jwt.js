'use strict';

const fs = require('fs');
const jwt = require('jsonwebtoken');

var payload = {
    data1: "data1"
};

var privateKey = fs.readFileSync('../keys/private.key', 'utf8');
var publicKey = fs.readFileSync('../keys/public.key', 'utf8');

module.exports = {
    sign: (payload, $Options) => {
        var signOptions = {
            issuer: $Options.issuer,
            subject: $Options.subject,
            audience: $Options.audience,
            expiresIn: "12h",
            algorithm: "RS256"
        };
        return jwt.sign(pauload, privateKey, signOptions);
    },
    verify: (token, $Option) => {
        var verifyOptions = {
            issuer:  $Option.issuer,
            subject:  $Option.subject,
            audience:  $Option.audience,
            expiresIn:  "30d",
            algorithm:  ["RS256"]
        };
        try{
            return jwt.verify(token, publicKEY, verifyOptions);
          }catch (err){
            return false;
          }
       },

    decode: (token) => {
       return jwt.decode(token, {complete: true});
       console.log(null)
    }
}

