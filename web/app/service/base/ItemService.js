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
    ITEM: '/item/infos/list',/* 查看物料列表 */
    SAVE:'/item/infos/insert',
    UPDATE:'/item/infos/update',
    DELETE:'/item/infos/delete',
    BATCH:'/item/batchs/list',
    ITEM_BATCH:'/pallet/batchs/item',

};

/**
 * 列表
 * @param thiz
 * @returns {Promise}
 */
module.exports.getItem = function (thiz, params) {
    return baseService.get(thiz, URI.ITEM, params);
};

/**
 * 批次列表
 * @param thiz
 * @returns {Promise}
 */
module.exports.ItemBatchList = function (thiz, params) {
    return baseService.get(thiz, URI.ITEM_BATCH, params);
};

/**新建物料*/
module.exports.createItem  = function (thiz, params) {
    return baseService.post(thiz, URI.SAVE, params);
};
/**修改物料*/
module.exports.updateItem  = function (thiz, params) {
    return baseService.post(thiz, URI.UPDATE, params);
};

/**删除物料*/
module.exports.deleteItem  = function (thiz, params) {
    return baseService.get(thiz, URI.DELETE, params);
};

/**批次列表*/
module.exports.batch  = function (thiz, params) {
    return baseService.get(thiz, URI.BATCH, params);
};



