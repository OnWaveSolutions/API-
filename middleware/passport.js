const { ExtractJwt, Strategy } = require('passport-jwt');
const { User } = require('../models/users');
const CONFIG = require('../config/config.js');
const {to} = require('../services/util.service');

module.exports = function(passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = "onwave123@dr";

    passport.use(new Strategy(opts, async function(jwt_payload, done) {
        let err, user;
        [err, user] = await to(User.findById(jwt_payload.user_id));
        if(err) return done(err, false);
        if(user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    }));
}