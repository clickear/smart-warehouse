'use strict';
/**
 * 注册passport策略
 */

var guest = require('./guest.config');
var local = require('./local.config');
var microblog = require('./microblog.config');

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    // 注册策略
    passport.use(guest);
    passport.use(local);
    passport.use(microblog);
};