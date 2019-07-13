var Redis = require('ioredis');
var _ = require('lodash/util');
var configRedis = require('../../config').app.cache.config;
var sessionRedis = require('../../config/strategy/session/redis.config').store;
var logger = require('./LoggerUtil').logger('RedisUtil');

var client = null;
var clientSession = null;

var _init = function () {
    if (client == null) {
        client = new Redis({
            host: configRedis.host,
            port: configRedis.port,
            password: configRedis.pass,
            db: configRedis.db,
            keyPrefix: configRedis.prefix
        });
        client.on('error', function (err) {
            if (err) {
                logger.error('connect to redis error, check your redis config', err);
                process.exit(1);
            }
        });
    }
};

/**
 * 初始化 Session Redis,保存登录后的 session 数据到 redis
 * @private
 */
var _initSessionRedis = function () {
    if (clientSession == null) {
        clientSession = new Redis({
            host: sessionRedis.host,
            port: sessionRedis.port,
            password: sessionRedis.pass,
            db: sessionRedis.db,
            keyPrefix: sessionRedis.prefix
        });
        clientSession.on('error', function (err) {
            if (err) {
                logger.error('connect to redis error, check your session redis config', err);
                process.exit(1);
            }
        });
    }
};

exports.get = function (key, callback) {
    _init();
    var t = new Date();
    client.get(key, function (err, data) {
        if (err) {
            return callback(err);
        }
        if (!data) {
            return callback();
        }
        var duration = (new Date() - t);
        logger.debug('Redis Cache', 'get', key, (duration + 'ms'));
        logger.debug(`Redis cache data: ${data}`);
        callback(data);
    });
};

exports.getJSON = function (key, callback) {
    exports.get(key, (data) => {
        try {
            data = JSON.parse(data);
        } catch (error) {
            data = {};
            logger.error(`Cannot be resolved to JSON ${data} `);
            logger.error(error);
        }
        callback(data);
    });
};

// time 参数可选，秒为单位
exports.set = function (key, value, time, callback) {
    _init();
    var t = new Date();

    if (typeof time === 'function') {
        callback = time;
        time = null;
    }
    callback = callback || _.noop;
    value = JSON.stringify(value);

    if (!time) {
        client.set(key, value, callback);
    } else {
        client.setex(key, time, value, callback);
    }
    var duration = (new Date() - t);
    logger.debug('Redis Cache', 'set', key, (duration + 'ms'));
};


/**
 *
 * @param key
 * @param value
 * @param time
 * @param callback
 */
exports.setSession = function (key, value, time, callback) {
    _initSessionRedis();
    var t = new Date();

    if (typeof time === 'function') {
        callback = time;
        time = null;
    }
    callback = callback || _.noop;
    value = JSON.stringify(value);

    if (!time) {
        clientSession.set(key, value, callback);
    } else {
        clientSession.setex(key, time, value, callback);
    }
    var duration = (new Date() - t);
    logger.debug('Redis Cache', 'set', key, (duration + 'ms'));
};
