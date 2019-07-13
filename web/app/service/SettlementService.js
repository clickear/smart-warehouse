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
    SETTLEMENT: '/order/supplys/queryList',
    SETTLEMENT_DETAIL:'/order/supplys/getOrderDetail/{0}',
    GET_LINE:'/order/supplys/getSupplyStatistics'/* 查询统计结算折线图数据 */
};

/**
 * 获取-用户列表
 * @param thiz
 * @returns {Promise}
 */
module.exports.getSettlement = function (thiz, params) {
    return baseService.get(thiz, URI.SETTLEMENT, params);
};
module.exports.getOrderById  = function (thiz, orderSupplyId) {
    return baseService.get(thiz, StringUtil.format(URI.SETTLEMENT_DETAIL, orderSupplyId));
};
/** 查询统计结算折线图数据*/
module.exports.getLine  = function (thiz, params) {
    return baseService.get(thiz, URI.GET_LINE, params);
};