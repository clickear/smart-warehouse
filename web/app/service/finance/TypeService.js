'use strict';
let underscore = require('underscore');
let RestifyProxy = require('../../util/RestifyProxy');
let StringUtil = require('../../util/StringUtil');
let Constant = require('../../model/Constant');
let baseService = require('./../BaseService');
const URI = {
    TYPE_LIST: '/finance/types/list',/* 财务类型类表 */
    SAVE: '/finance/types/insert',/* 保存 */
    DELETE:'/finance/types/delete',
    UPDATE:'/finance/types/update'
};

/** 财务类别列表 */
module.exports.getTypes = function (thiz, params) {
    return baseService.get(thiz, URI.TYPE_LIST, params);
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

