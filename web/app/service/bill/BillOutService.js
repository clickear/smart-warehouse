'use strict';
let underscore = require('underscore');
let RestifyProxy = require('../../util/RestifyProxy');
let StringUtil = require('../../util/StringUtil');
let Constant = require('../../model/Constant');
let baseService = require('./../BaseService');
const URI = {
    BILL_MASTERS: '/bill/masters/list',/* 单据——列表查询 */
    CHECK:'/bill/masters/check',
    OK:'/outbound/confirmOut',
    EXPORT:'',
    DELETE:'/bill/masters/delete',
    PREPARE:'/pallet/batchs/prepare',
    COMPLETE:'/bill/masters/completeOut',
};

/** 单据查询——billMaster */
module.exports.getBillMasters = function (thiz, params) {
    return baseService.get(thiz, URI.BILL_MASTERS, params);
}



/** 保存——billMaster */
module.exports.save = function (thiz, params) {
    return baseService.post(thiz, URI.SAVE, params);
}

/** 单据查询——billDetail */
module.exports.getBillDetails = function (thiz, params) {
    return baseService.get(thiz, URI.BILL_DETAILS, params);
}

/** 审核 */
module.exports.check = function (thiz, params) {
    return baseService.get(thiz, URI.CHECK, params);
}

/** 确定出库 */
module.exports.ok = function (thiz, params) {
    return baseService.get(thiz, URI.OK, params);
}

/** 导出 */
module.exports.export = function (thiz, params) {
    return baseService.get(thiz, URI.EXPORT, params);
}

/** 删除 */
module.exports.delete = function (thiz, params) {
    return baseService.get(thiz, URI.DELETE, params);
}


/** 配货 */
module.exports.prepare = function (thiz, params) {
    return baseService.get(thiz, URI.PREPARE, params);
}
/** 完成 */
module.exports.complete = function (thiz, params) {
    return baseService.get(thiz, URI.COMPLETE, params);
}
