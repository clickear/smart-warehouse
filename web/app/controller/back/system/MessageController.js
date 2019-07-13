'use strict';
let Response = require('../../../model/Response');
let RestifyProxy = require('../../../util/RestifyProxy');
let CustomPageBean = require('../../../model/CustomPageBean');
let StringUtil = require('../../../util/StringUtil');
let systemService = require('../../../service/SystemService');
let messageService = require('../../../service/MessageService');
let logger = require('../../../util/LoggerUtil').logger('MessageController.js');


module.exports.messagePage = function () {
    let response = new Response();
    response.render('back/system/message/message');
    this.resolve(response);
};

module.exports.detailPage = function () {
    let response = new Response();
    response.render('back/system/message/message-detail');
    this.resolve(response);
};


/**
 * 获取-告警参数列表（分页）
 * @returns {Promise.<void>}
 */
module.exports.getMessageListPaging = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await messageService.getMessageListPaging(this, params);
        let pageBean = new CustomPageBean(result);
        response.send(pageBean);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};


module.exports.getMessageById = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await messageService.getMessageById(this, params.id);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};



module.exports.enabledMessageById = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await messageService.enabledMessageById(this, params.id);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

module.exports.disabledMessageById = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await messageService.disabledMessageById(this, params.id);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};
