/**
 * Created by Administrator on 2017/11/20.
 */
/**
 * Created by Administrator on 2017/11/16.
 */
'use strict';
let Response = require('../../../model/Response');
let RestifyProxy = require('../../../util/RestifyProxy');
let CustomPageBean = require('../../../model/CustomPageBean');

let TypeService = require('../../../service/finance/TypeService');
let logger = require('../../../util/LoggerUtil').logger('BillInController.js');

/**
 * 财务类型-页面
 */
module.exports.TypePage = function () {
    let response = new Response();
    response.render('back/finance/type/type');
    this.resolve(response);
};
/**
 * 入库单详情查看-页面
 */
module.exports.DetailPage = function () {
    let response = new Response();
    response.render('back/bill/in/detail-bill-in');
    this.resolve(response);
};

/**
 * leibie列表
 */
module.exports.List = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await TypeService.getTypes(this, params);
        let pageBean = new CustomPageBean(result);
        response.send(pageBean);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/**
 * save
 */
module.exports.Save = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await TypeService.save(this, params);

        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/**
 * save
 */
module.exports.Delete = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await TypeService.delete(this, params);

        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/**
 * update
 */
module.exports.Update = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await TypeService.update(this, params);

        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

