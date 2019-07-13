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
    LIST_PAGING: '/system/params/message/list',
    DETAIL: '/system/params/message/{0}',
    ENABLED: '/system/params/message/{0}/enable',
    DISABLED: '/system/params/message/{0}/disable'
};

module.exports.getMessageListPaging = function (thiz, params) {
    return baseService.get(thiz, URI.LIST_PAGING, params);
};


module.exports.getMessageById = function (thiz, id) {
    return baseService.get(thiz, StringUtil.format(URI.DETAIL, id));
};

module.exports.enabledMessageById = function (thiz, id) {
    return baseService.put(thiz, StringUtil.format(URI.ENABLED, id));
};

module.exports.disabledMessageById = function (thiz, id) {
    return baseService.put(thiz, StringUtil.format(URI.DISABLED, id));
};










