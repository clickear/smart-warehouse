'use strict';
let underscore = require('underscore');
let RestifyProxy = require('../util/RestifyProxy');
let StringUtil = require('../util/StringUtil');
let Constant = require('../model/Constant');
let baseService = require('./BaseService');
const URI = {
    STORAGE_LIST: '/storage',
    CREATE_STORAGE: '/storage',
    STORAGE_DETAIL: '/storage/{0}',
    MODIFY_STORAGE: '/storage/{0}',
    DELETE_STORAGE: '/storage/{0}'
};

/**
 * 获取-平台网点、仓储点（分页）
 * @param thiz
 * @param params {companyId：1}  1 : 就是平台网店
 */
module.exports.getStorageListPaging = function (thiz, params) {
    return baseService.get(thiz, URI.STORAGE_LIST, params);
};


/**
 * 创建平台网点、仓储点
 * @param thiz
 * @param params
 */
module.exports.createStorage = function (thiz, params) {
    return baseService.post(thiz, URI.CREATE_STORAGE, params);
};


/**
 * 获取-平台网点、仓储点详情
 * @param thiz
 * @param storageId
 */
module.exports.detailStorage = function (thiz, params) {
    return baseService.get(thiz, StringUtil.format(URI.STORAGE_DETAIL, params.storageId));
};

/**
 * 修改-平台网点、仓储点
 * @param thiz
 * @param params
 */
module.exports.modifyStorage = function (thiz, params) {
    return baseService.put(thiz, StringUtil.format(URI.MODIFY_STORAGE, params.storageId), params);
};


/**
 * 删除-平台网点、仓储点
 * @param thiz
 * @param params
 */
module.exports.deleteStorage = function (thiz, storageId) {
    return baseService.del(thiz, StringUtil.format(URI.DELETE_STORAGE, storageId));
};