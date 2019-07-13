'use strict';

/**
 * @type {*}
 */

let underscore = require('underscore');
let RestifyProxy = require('../util/RestifyProxy');
let StringUtil = require('../util/StringUtil');
let Constant = require('../model/Constant');
let baseService = require('./BaseService');
const URI = {
    REGISTER_SAVE: '/register', // 保存注册信息
};

/**
 * 注册
 * @param thiz
 * @param params
 * @returns {Promise}
 */
module.exports.registerSave = function (thiz, params) {
    return baseService.post(thiz, URI.REGISTER_SAVE, params);
};



