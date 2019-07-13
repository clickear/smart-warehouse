'use strict';

/**
 * @type {*}
 */

let underscore = require('underscore');
let RestifyProxy = require('../util/RestifyProxy');
let StringUtil = require('../util/StringUtil');
let Constant = require('../model/Constant');
const URI = {};

/**
 * 获取账户列表
 * @param thiz
 * @returns {Promise}
 */
module.exports.getAccountList = function (thiz) {
    return new Promise(function (resolve, reject) {
        new RestifyProxy(thiz)
            .setUrl(StringUtil.format())
            .get(function (result) {
                resolve(result);
            });
    });
};
