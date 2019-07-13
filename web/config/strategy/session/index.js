/**
 * 选择 session store 策略
 * @param storeStrategy mysql|redis|memory
 * @returns {*}
 */
module.exports = function (session, storeStrategy) {
    var sessionStore;
    if (storeStrategy === 'mysql') {
        var MySQLStore = require('express-mysql-session')(session);
        sessionStore = new MySQLStore(require('./mysql.config').store);
    } else if (storeStrategy === 'redis') {
        var RedisStore = require('connect-redis')(session);
        sessionStore = new RedisStore(require('./redis.config').store);
    } else {
        sessionStore = null;
    }
    return sessionStore;
};