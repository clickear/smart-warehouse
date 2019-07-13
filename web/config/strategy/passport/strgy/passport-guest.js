'use strict';
var passport = require('passport-strategy'),
    util = require('util');

/**
 * 自定义策略 - 游客登录
 * @param verify
 * @constructor
 */
function Strategy(verify) {
    if (!verify) {
        throw new TypeError('GuestStrategy requires a verify callback');
    }
    passport.Strategy.call(this);
    this.name = 'guest';
    this._verify = verify;
}

util.inherits(Strategy, passport.Strategy);

Strategy.prototype.authenticate = function () {
    var thiz = this;
    thiz._verify(function (user, info) {
        Object.defineProperty(user, 'anonymous', {
            value: true,
            writable: false,
            enumerable: false,
            configurable: false
        });
        thiz.success(user, info);
    });
};

module.exports = {
    Strategy: Strategy
};