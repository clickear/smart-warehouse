/**
 * Created by Administrator on 2017/11/16.
 */
'use strict';
let Response = require('../../../model/Response');
let RestifyProxy = require('../../../util/RestifyProxy');
let CustomPageBean = require('../../../model/CustomPageBean');
let HelpDocumentService = require('../../../service/HelpDocumentService');
let logger = require('../../../util/LoggerUtil').logger('HelpDocumentController.js');

/**
 * 优惠政策-页面
 */
module.exports.helpDocumentPage = function () {
    let response = new Response();
    response.render('back/run/help-document/help-document');
    this.resolve(response);
};

/**
 * 优惠政策列表
 */
module.exports.helpDocumentList = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await HelpDocumentService.getPolicies(this, params);
        let pageBean = new CustomPageBean(result);
        response.send(pageBean);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};
module.exports.categoryList= async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await HelpDocumentService.getcategoryList(this, params);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};
/**
 * 创建新增发布优惠-页面
 */
module.exports.createOrModifyPage = function () {
    let response = new Response();
    response.render('back/run/help-document/create-or-modify-document');
    this.resolve(response);
};
module.exports.createDiscounts = async function () {
    let req = this.req;
    let params = req.body;
    console.log(params);
    let response = new Response();
    try {
        let result = await HelpDocumentService.createDiscounts(this, params);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

module.exports.modifyDiscountsById = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await HelpDocumentService.modifyDiscountsById(this, params);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

module.exports.getDiscountsById = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await HelpDocumentService.getDiscountsById(this, params.id);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};
module.exports.deleteDiscountsById = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await HelpDocumentService.deleteDiscountsById(this, params.contentId);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/**
 * 优惠信息-详情
 */
module.exports.detailPage =function () {
    let response = new Response();
    response.render('back/run/help-document/detail-help-document');
    this.resolve(response);
};


/**
 * 再次编辑-页面
 */
module.exports.compileAgainPage = function () {
    let response = new Response();
    response.render('back/run/help-document/compile-again');
    this.resolve(response);
};


