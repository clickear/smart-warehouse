'use strict';
let underscore = require('underscore');
let RestifyProxy = require('../../util/RestifyProxy');
let StringUtil = require('../../util/StringUtil');
let Constant = require('../../model/Constant');
let baseService = require('./../BaseService');
const URI = {
    BILL_MASTERS: '/bill/masters/list',/* 单据——列表查询 */
    SAVE: ' ',/* 保存 */
};

/** 单据查询——billMaster */
module.exports.getBillMasters = function (thiz, params) {
    return baseService.get(thiz, URI.BILL_MASTERS, params);
}

/** 保存——billMaster */
module.exports.save = function (thiz, params) {
    return baseService.post(thiz, URI.SAVE, params);
}

