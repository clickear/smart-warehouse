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
    LIST: '/supplier/manages/list',/* 查看列表 */
    SAVE:'/supplier/manages/insert',
    UPDATE:'/supplier/manages/update',
    DELETE:'/supplier/manages/delete',

};

/** 列表 */
module.exports.getSupplier = function (thiz, params) {
    return baseService.get(thiz, URI.LIST, params);
}
/**

/**新建 */
module.exports.createSupplier  = function (thiz, params) {
    return baseService.post(thiz, URI.SAVE, params);
};

/**更新 */
module.exports.updateSupplier  = function (thiz, params) {
    return baseService.post(thiz, URI.UPDATE, params);
};

/**删除 */
module.exports.deleteSupplier  = function (thiz, params) {
    return baseService.get(thiz, URI.DELETE, params);
};
