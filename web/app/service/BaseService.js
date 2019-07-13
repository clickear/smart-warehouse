'use strict';
let underscore = require('underscore');
let RestifyProxy = require('../util/RestifyProxy');
let StringUtil = require('../util/StringUtil');
let Constant = require('../model/Constant');

module.exports.get = function (thiz, url, params) {
    if (params) {
        url = StringUtil.formatGetRquestUri(url, params);
    }
    return new Promise(function (resolve, reject) {
        new RestifyProxy(thiz)
            .setUrl(url)
            .get(function (result) {
                resolve(result);
            });
    });
};

module.exports.put = function (thiz, url, params) {
    params = params || {};
    return new Promise(function (resolve, reject) {
        new RestifyProxy(thiz)
            .setUrl(url)
            .setParameter(params)
            .put(function (result) {
                resolve(result);
            });
    });
};

module.exports.del = function (thiz, url) {
    return new Promise(function (resolve, reject) {
        new RestifyProxy(thiz)
            .setUrl(url)
            .del(function (result) {
                resolve(result);
            });
    });
};


module.exports.post = function (thiz, url, params) {
    params = params || {};
    return new Promise(function (resolve, reject) {
        new RestifyProxy(thiz)
            .setUrl(url)
            .setParameter(params)
            .post(function (result) {
                resolve(result);
            });
    });
};

module.exports.uploadFile = function (thiz, url, params) {
    params = params || {};
    return new Promise(function (resolve, reject) {
        new RestifyProxy(thiz)
            .setUrl(url)
            .setFormData(params)
            .uploadFile(function (result) {
                resolve(result);
            });
    });
};

