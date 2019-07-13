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
    AREA: '/area/infos/list',/*   */
    AREA_ITEM:'/area/items/list',
    SAVE:'/area/infos/insert',
    WARE_INFO:'/ware/infos/list',
    DELETE:'/area/infos/delete',
    UPDATE:'/area/infos/update',

};

/**
 * 获取-货区列表
 * @param thiz
 * @returns {Promise}
 */
module.exports.getArea = function (thiz, params) {
    return baseService.get(thiz, URI.AREA, params);
};

/** 获取仓库数据下拉框使用*/
module.exports.getWare  = function (thiz,params) {
    return baseService.get(thiz,URI.WARE_INFO,params);
};

/**新建货区*/
module.exports.createArea  = function (thiz, params) {
    return baseService.post(thiz, URI.SAVE, params);
};

/**获取areaItem*/
module.exports.getAreaItem  = function (thiz, params) {
    return baseService.get(thiz, URI.AREA_ITEM, params);
};

/**删除货区*/
module.exports.deleteArea  = function (thiz, params) {
    return baseService.get(thiz, URI.DELETE, params);
};


/**更新货区*/
module.exports.updateArea  = function (thiz, params) {
    return baseService.post(thiz, URI.UPDATE, params);
};


