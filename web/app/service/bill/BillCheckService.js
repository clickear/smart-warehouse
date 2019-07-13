'use strict';
let underscore = require('underscore');
let RestifyProxy = require('../../util/RestifyProxy');
let StringUtil = require('../../util/StringUtil');
let Constant = require('../../model/Constant');
let baseService = require('./../BaseService');
const URI = {
    BILL_MASTERS: '/count/masters/list',/* 单据——列表查询 */
    SAVE:'/count/masters/insert',
    BILL_DETAILS:'/count/details/list',
    TASK:'/count/tasks/add',
};

/** 单据查询——billMaster */
module.exports.getBillMasters = function (thiz, params) {
    return baseService.get(thiz, URI.BILL_MASTERS, params);
}


module.exports.save = function (thiz, params) {
    return baseService.post(thiz, URI.SAVE, params);
}

/** 单据查询——  */
module.exports.BillCheckDetailData = function (thiz, params) {
    return baseService.get(thiz, URI.BILL_DETAILS, params);
}


module.exports.task = function (thiz, params) {
    return baseService.get(thiz, URI.TASK, params);
}
