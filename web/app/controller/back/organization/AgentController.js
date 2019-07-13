'use strict';
let Response = require('../../../model/Response');
let RestifyProxy = require('../../../util/RestifyProxy');

// 代理商管理 --------------------------------------------------------------------------------------------------------
/**
 * 代理商管理-页面
 */
module.exports.agentPage = function () {
    let response = new Response();
    response.render('back/organization/agent/agent');
    this.resolve(response);
};



/**
 * 代理商-详情页面
 */
module.exports.detailPage = function () {
    let response = new Response();
    response.render('back/organization/agent/agent-detail');
    this.resolve(response);
};


/**
 * 新增-代理商-页面
 */
module.exports.createAgentPage = function () {
    let response = new Response();
    response.render('back/organization/agent/create-agent');
    this.resolve(response);
};


/**
 * 修改-页面
 */
module.exports.modifyPage = function () {
    let response = new Response();
    response.render('back/organization/agent/modify-agent');
    this.resolve(response);
};

/**
 * 仓储点管理 --------------------------------------------------------------------------------------------------------
 */
module.exports.storagePage = function () {
    let response = new Response();
    response.render('back/organization/agent/storage/storage');
    this.resolve(response);
};

/**
 * 仓储点-详情页面
 */
module.exports.storageDetailPage = function () {
    let response = new Response();
    response.render('back/organization/agent/storage/storage-detail');
    this.resolve(response);
};


/**
 * 新增-仓储点-页面
 */
module.exports.createStoragePage = function () {
    let response = new Response();
    response.render('back/organization/agent/storage/create-storage');
    this.resolve(response);
};



/**
 * 修改-仓储点-页面
 */
module.exports.modifyStoragePage = function () {
    let response = new Response();
    response.render('back/organization/agent/storage/modify-storage');
    this.resolve(response);
};




















