'use strict';
/**
 * @type {*}
 */
let underscore = require('underscore');
let RestifyProxy = require('../../util/RestifyProxy');
let StringUtil = require('../../util/StringUtil');
let Constant = require('../../model/Constant');
let baseService = require('./../BaseService');
const URI = {
    INVENTORY_WARNING: '/ViewItemQuantity/queryList',/* 查询库存预警 */
    RETURN_DETAIL:'/order/return/getOrderReturnInfo/{0}', /* 查询租赁退板详情 */

};

/**
 * 获取-托盘租赁退板列表
 * @param thiz
 * @returns {Promise}
 */
module.exports.getInventoryWarning = function (thiz, params) {
    return baseService.get(thiz, URI.INVENTORY_WARNING, params);
};

