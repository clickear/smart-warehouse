'use strict';

/**
 * 游客登录策略
 */
var GuestStrategy = require('./strgy/passport-guest').Strategy,
    privs = require('../../../config').privs;

/**
 * 获取角色所对应的权限url
 * @param privs
 * @param roles
 * @param roleId
 * @returns {{fuzzy: Array, full: Array}}
 */
var processUrls = function (privs, roles, roleId) {
    let tempArr = roles[roleId].privs;
    let fuzzy = [];
    let full = [];
    tempArr.forEach(function (item) {
        privs.fuzzy[item] && fuzzy.push(privs.fuzzy[item]);
        privs.full[item] && full.push(privs.full[item]);
    });
    return {fuzzy: fuzzy, full: full};
};

module.exports = new GuestStrategy(function (done) {
    let result = {
        err: 200,
        user: {
            anonymous: true,
            role: '10' // 游客
        },
        info: 'success'
    };
    result.user.authorizedUrls = processUrls(privs.privs, privs.roles, result.user.role);
    done(result); // req.user.anonymous=true
});