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
    AREA_ITEM: '/pallet/batchs/areaItem',/*   */


};

/**
 * 获取-
 * @param thiz
 * @returns {Promise}
 */
module.exports.getAreaItem = function (thiz, params) {
    return baseService.get(thiz, URI.AREA_ITEM, params);
};



