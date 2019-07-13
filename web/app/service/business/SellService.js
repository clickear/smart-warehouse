'use strict';
let underscore = require('underscore');
let RestifyProxy = require('../../util/RestifyProxy');
let StringUtil = require('../../util/StringUtil');
let Constant = require('../../model/Constant');
let baseService = require('./../BaseService');
const URI = {
    LIST: '/sale/manages/list',/* 单据——列表查询 */
    SAVE: '/sale/manages/insert',/* 保存 */
    DELETE: '/sale/manages/delete',
    UPDATE: '/sale/manages/update',/* 保存 */
    CHECK:'/sale/manages/check',
    EXPORT:'',
    TONGJI:'/sale/masters/tongji',
    BILL_DETAILS:'/sale/manages/list',

};

/** 单据查询——billDetail */
module.exports.getBillDetails = function (thiz, params) {
    return baseService.get(thiz, URI.BILL_DETAILS, params);
}

/** 单据查询——billMaster */
module.exports.getList = function (thiz, params) {
    return baseService.get(thiz, URI.LIST, params);
}

/** 保存——billMaster */
module.exports.save = function (thiz, params) {
    return baseService.post(thiz, URI.SAVE, params);
}
/** 审核 */
module.exports.check = function (thiz, params) {
    return baseService.get(thiz, URI.CHECK, params);
}
/** 导出 */
module.exports.export = function (thiz, params) {
    return baseService.get(thiz, URI.EXPORT, params);
}
/** 统计 */
module.exports.tongji = function (thiz, params) {
    return baseService.get(thiz, URI.TONGJI, params);
}
/** 删除 */
module.exports.delete = function (thiz, params) {
    return baseService.get(thiz, URI.DELETE, params);
}
/** 更新 */
module.exports.update = function (thiz, params) {
    return baseService.get(thiz, URI.UPDATE, params);
}/** 确定 */
module.exports.ok = function (thiz, params) {
    return baseService.get(thiz, URI.OK, params);
}