var RedisUtil = require('./RedisUtil'),
    LocalCache = require('../model/LocalCache'),
    cacheStrategy = require('../../config').app.cache.strategy;

/**
 * 获取缓存数据
 * @param key
 * @param callback
 */
exports.get = function (key, callback) {
    if (cacheStrategy === 'redis') {
        RedisUtil.get(key, callback);
    } else {
        callback(null, LocalCache.data[key]);
    }
};
/**
 * 获取-缓存数据
 * @param key
 * @param callback
 */
exports.getJSON = function (key, callback) {
    if (cacheStrategy === 'redis') {
        RedisUtil.getJSON(key, callback);
    } else {
        callback(null, LocalCache.data[key]);
    }
}

/**
 * 更新缓存数据
 * @param key
 * @param val
 * @param time
 * @param callback
 */
exports.set = function (key, val, time, callback) {
    if (cacheStrategy === 'redis') {
        RedisUtil.set(key, val, time, callback);
    } else {
        LocalCache.data[key] = val;
        if (typeof callback === 'function') {
            callback();
        }
    }
};

/**
 * 移除缓存数据
 * @param key
 * @param callback
 */
exports.refresh = function (key, callback) {
    if (cacheStrategy === 'redis') {
        RedisUtil.set(key, undefined, callback);
    } else {
        delete LocalCache.data[key];
        if (typeof callback === 'function') {
            callback();
        }
    }
};
/**
 * 移除redis session数据
 * @param key
 * @param callback
 */
exports.delSessionRedis = function (key, callback) {
    if (cacheStrategy === 'redis') {
        RedisUtil.setSession(key, undefined, callback);
    } else {
        delete LocalCache.data[key];
        if (typeof callback === 'function') {
            callback();
        }
    }
};