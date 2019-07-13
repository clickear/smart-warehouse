'use strict';
let underscore = require('underscore');
let RestifyProxy = require('../util/RestifyProxy');
let StringUtil = require('../util/StringUtil');
let Constant = require('../model/Constant');
let baseService = require('./BaseService');
const URI = {
    BILL_MASTERS: '/bill/masters/list',/* 单据——列表查询 */
};

/** 单据查询——billMaster */
module.exports.getBillMasters = function (thiz, params) {
    return baseService.get(thiz, URI.BILL_MASTERS, params);
}

