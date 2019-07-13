'use strict';
let underscore = require('underscore');
let RestifyProxy = require('../../util/RestifyProxy');
let StringUtil = require('../../util/StringUtil');
let Constant = require('../../model/Constant');
let baseService = require('./../baseService');
const URI = {
    LIST: '/order/manages/list',/* 单据——列表查询 */
    SAVE: '/order/manages/insert',/* 保存 */
    BUY_DETAILS:'/order/manages/detail',

    // CHECK:'/business/buy/check',
    //     // OK:'/inbound/confirmIn',

    DELETE:'/order/manages/delete',
    // TONGJI:'/business/buy/tongji',
};

/** 单据查询——billMaster */
module.exports.list = function (thiz, params) {
    return  baseService.get(thiz, URI.LIST, params);
}

/** 保存——billMaster */
module.exports.save = function (thiz, params) {
    return baseService.post(thiz, URI.SAVE, params);
}

/** 查询 */
module.exports.getbuyDetails = function (thiz, params) {
    return baseService.get(thiz, URI.BUY_DETAILS, params);
}

// /** 审核 */
// module.exports.check = function (thiz, params) {
//     return businessService.get(thiz, URI.CHECK, params);
// }
//
// /** 确定入库 */
// module.exports.ok = function (thiz, params) {
//     return businessService.get(thiz, URI.OK, params);
// }
//
// /** 导出 */
// module.exports.export = function (thiz, params) {
//     return businessService.get(thiz, URI.EXPORT, params);
// }

/** 删除 */
module.exports.delete = function (thiz, params) {
    return baseService.get(thiz, URI.DELETE, params);
}

// /** 统计 */
// module.exports.tongji = function (thiz, params) {
//     return businessService.get(thiz, URI.TONGJI, params);
// }

