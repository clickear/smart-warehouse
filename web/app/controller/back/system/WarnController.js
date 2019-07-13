'use strict';
let Response = require('../../../model/Response');
let RestifyProxy = require('../../../util/RestifyProxy');
let CustomPageBean = require('../../../model/CustomPageBean');
let StringUtil = require('../../../util/StringUtil');
let systemService = require('../../../service/SystemService');
let warnService = require('../../../service/WarnService');
let logger = require('../../../util/LoggerUtil').logger('WarnController.js');


module.exports.warnPage = function () {
    let response = new Response();
    response.render('back/system/warn/warn');
    this.resolve(response);
};

module.exports.detailPage = function () {
    let response = new Response();
    response.render('back/system/warn/warn-detail');
    this.resolve(response);
};

module.exports.createOrModifyPage = function () {
    let response = new Response();
    response.render('back/system/warn/create-or-modify-warn');
    this.resolve(response);
};

/**
 * 获取-告警参数列表（分页）
 * @returns {Promise.<void>}
 */
module.exports.getWarnListPaging = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await warnService.getWarnListPaging(this, params);
        let pageBean = new CustomPageBean(result);
        response.send(pageBean);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};


module.exports.getWarnById = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await warnService.getWarnById(this, params.id);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

module.exports.createWarn = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await warnService.createWarn(this, params);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};


module.exports.modifyWarnById = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await warnService.modifyWarnById(this, params);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

module.exports.deleteWarnById = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await warnService.deleteWarnById(this, params.id);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

module.exports.enabledWarnById = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await warnService.enabledWarnById(this, params.id);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

module.exports.disabledWarnById = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await warnService.disabledWarnById(this, params.id);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

