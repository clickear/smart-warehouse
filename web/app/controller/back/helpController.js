'use strict';
let Response = require('../../model/Response');
let RestifyProxy = require('../../util/RestifyProxy');
let CustomPageBean = require('../../model/CustomPageBean');
let helpService = require('../../service/HelpService');
let logger = require('../../util/LoggerUtil').logger('helpController.js');

/**
 * 帮助中心-页面
 */
module.exports.helpPage = function () {
    let response = new Response();
    response.render('back/help/help');
    this.resolve(response);
};
/**
 * 帮助中心数据
 */

module.exports.helpData  = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await helpService.getHelpData(this, params);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};
/**
 * 帮助中心详情-页面
 */
module.exports.helpDetailPage = function () {
    let response = new Response();
    response.render('back/help/detail-help');
    this.resolve(response);
};