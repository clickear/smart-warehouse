'use strict';

let underscore = require('underscore');
let RestifyProxy = require('../util/RestifyProxy');
let StringUtil = require('../util/StringUtil');
let Constant = require('../model/Constant');
let baseService = require('./BaseService');
const URI = {
    LIST: '/back/messages/page',
    CONFIRM: '/order/confirmReceipt/{0}',
    READ:'/back/messages/{0}',
    STATISTICS_STATUS:'/statistics/status',
    STATISTICS_DISTRIBUTION:'/statistics/distribution',
};

/**
 * 获取-代码事项列表
 * @param thiz
 * @returns {Promise}
 */
module.exports.getBacklogListPaging = function (thiz, params) {
    return baseService.get(thiz, URI.LIST, params);
};

/**
 * 获取后台统计数据
 * @param thiz
 * @param params
 */
module.exports.backlogStatistics = function (thiz, params) {
    return baseService.get(thiz, URI.STATISTICS_STATUS, params);
};

/**
 * 获取-后台分布统计数据
 * @param thiz
 * @param params
 */
module.exports.backlogDistributionData = function (thiz, params) {
    return baseService.get(thiz, URI.STATISTICS_DISTRIBUTION, params);
};
module.exports.confirmReceipt = function (thiz, params) {
    return baseService.get(thiz,  StringUtil.format(URI.CONFIRM, params));
};
module.exports.readReceipt = function (thiz, params) {
    return baseService.get(thiz, URI.READ, params);
};



