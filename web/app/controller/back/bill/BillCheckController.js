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

let BillCheckService = require('../../../service/bill/BillCheckService');
let logger = require('../../../util/LoggerUtil').logger('BillCheckController.js');

/**
 * 盘点单查看-页面
 */
module.exports.BillCheckPage = function () {
    let response = new Response();
    response.render('back/bill/check/bill-check');
    this.resolve(response);
};
/**
 * 盘点详情查看-页面
 */
module.exports.BillCheckDetailPage = function () {
    let response = new Response();
    response.render('back/bill/check/detail-bill-check');
    this.resolve(response);
};

/**
 * 盘点新建-页面
 */
module.exports.BillCheckCreatePage = function () {
    let response = new Response();
    response.render('back/bill/check/create-bill-check');
    this.resolve(response);
};

/**
 *
 */
module.exports.List = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await BillCheckService.getBillMasters(this, params);
        let pageBean = new CustomPageBean(result);
        response.send(pageBean);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/**
 *  保存
 */
module.exports.save = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await BillCheckService.save(this, params);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/**
 *  保存
 */
module.exports.task = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await BillCheckService.task(this, params);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/**
 * 盘点单主数据数据
 */
module.exports.BillCheckDetailData = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await BillCheckService.BillCheckDetailData(this, params);
        let pageBean = new CustomPageBean(result);
        response.send(pageBean);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};
