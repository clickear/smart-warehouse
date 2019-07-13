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
    CONFIRM: '/order/supplys/queryList',
    CONFIRM_DETAIL:'/order/supplys/getOrderDetail/{0}',
    ORDER_CONFIRM:'/order/supplys/orderConfirm/{0}',
    CONFIRM_CONTRACT_LIST:'/contract/files', /* 查询订单确认详情合同列表 */
};

/**
 * 获取-用户列表
 * @param thiz
 * @returns {Promise}
 */
module.exports.getConfirm = function (thiz, params) {
    return baseService.get(thiz, URI.CONFIRM, params);
};
module.exports.getOrderById  = function (thiz, orderSupplyId) {
    return baseService.get(thiz, StringUtil.format(URI.CONFIRM_DETAIL, orderSupplyId));
};
//续租确认
module.exports.getOrderConfirmById  = function (thiz,orderSupplyId) {
    return baseService.put(thiz, StringUtil.format(URI.ORDER_CONFIRM, orderSupplyId));
};
/**
 * 获取-托盘租赁详情-合同信息列表
 * @param thiz
 * @returns {Promise}
 */
module.exports.getContractManagementList = function (thiz, params) {
    return baseService.get(thiz, URI.CONFIRM_CONTRACT_LIST, params);
};




/**
 * Created by Administrator on 2017/10/16.
 */
