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
    WARN_LIST: '/system/params/alarm/list',
    WARN_DETAIL: '/system/params/alarm/{0}',
    CREATE_WARN: '/system/params/alarm',
    MODIFY_WARN: '/system/params/alarm/{0}',
    DELETE_WARN: '/system/params/alarm/{0}',
    ENABLED_WARN: '/system/params/alarm/{0}/enable',
    DISABLED_WARN: '/system/params/alarm/{0}/disable'
};

/**
 * 获取-告警参数列表
 * @param thiz
 * @returns {Promise}
 */
module.exports.getWarnListPaging = function (thiz, params) {
    return baseService.get(thiz, URI.WARN_LIST, params);
};


/**
 * 获取-告警参数详情
 * @param thiz
 * @param id
 */
module.exports.getWarnById = function (thiz, id) {
    return baseService.get(thiz, StringUtil.format(URI.WARN_DETAIL, id));
};

/**
 * 新增-告警参数
 * @param thiz
 * @param params
    {
      "action": 0,
      "alarmParam": 0,
      "paramDescribe": "string",
      "paramName": "string",
      "state": "string",
      "terminalPosition": true
    }
 */
module.exports.createWarn = function (thiz, params) {
    return baseService.post(thiz, URI.CREATE_WARN, params);
};

/**
 * 修改-告警参数
 * @param thiz
 * @param params
    {
      "action": 0,
      "alarmParam": 0,
      "alarmParamId": 0,
      "paramDescribe": "string",
      "paramId": 0,
      "paramName": "string",
      "state": "string",
      "terminalPosition": true
    }
 */
module.exports.modifyWarnById = function (thiz, params) {
    return baseService.put(thiz, StringUtil.format(URI.MODIFY_WARN, params.alarmParamId), params);
};

/**
 * 删除-告警参数
 * @param thiz
 * @param id
 */
module.exports.deleteWarnById = function (thiz, id) {
    return baseService.del(thiz, StringUtil.format(URI.DELETE_WARN, id));
};

module.exports.enabledWarnById = function (thiz, id) {
    return baseService.put(thiz, StringUtil.format(URI.ENABLED_WARN, id));
};

module.exports.disabledWarnById = function (thiz, id) {
    return baseService.put(thiz, StringUtil.format(URI.DISABLED_WARN, id));
};










