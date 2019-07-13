'use strict';
let Response = require('../../../model/Response');
let RestifyProxy = require('../../../util/RestifyProxy');

// POI管理--------------------------------------------------------------------------------------------------------
/**
 * POI管理-页面
 */
module.exports.poiPage = function () {
    let response = new Response();
    response.render('back/organization/poi/poi');
    this.resolve(response);
};

/**
 * 供应商-详情页面
 */
module.exports.detailPage = function () {
    let response = new Response();
    response.render('back/organization/poi/poi-detail');
    this.resolve(response);
};



/**
 * 新增-供应商-页面
 */
module.exports.createPoiPage = function () {
    let response = new Response();
    response.render('back/organization/poi/create-poi');
    this.resolve(response);
};


/**
 * 修改-页面
 */
module.exports.modifyPage = function () {
    let response = new Response();
    response.render('back/organization/poi/modify-poi');
    this.resolve(response);
};
















