'use strict';
let underscore = require('underscore');
let RestifyProxy = require('../../util/RestifyProxy');
let StringUtil = require('../../util/StringUtil');
let Constant = require('../../model/Constant');
let baseService = require('./../BaseService');
const URI = {
    LIST: '/manage/ars/list',/* 财务类型类表 */
    SAVE: '/manage/ars/insert',/* 保存 */
    DELETE:'/manage/ars/delete',
    UPDATE:'/manage/ars/update'
};

/** 列表 */
module.exports.getList = function (thiz, params) {
    return baseService.get(thiz, URI.LIST, params);
}

/** 保存—— */
module.exports.save = function (thiz, params) {
    return baseService.post(thiz, URI.SAVE, params);
}

//删除
module.exports.delete  = function (thiz, params) {
    return baseService.get(thiz, URI.DELETE, params);
};


//gengxin
module.exports.update  = function (thiz, params) {
    return baseService.post(thiz, URI.UPDATE, params);
};

