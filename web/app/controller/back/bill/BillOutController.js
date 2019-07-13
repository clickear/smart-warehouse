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

let BillOutService = require('../../../service/bill/BillOutService');
let logger = require('../../../util/LoggerUtil').logger('BillInController.js');

/**
 * 出库单查看-页面
 */
module.exports.BillOutPage = function () {
    let response = new Response();
    response.render('back/bill/out/bill-out');
    this.resolve(response);
};
/**
 * 出库单详情查看-页面
 */
module.exports.BillOutDetailPage = function () {
    let response = new Response();
    response.render('back/bill/out/detail-bill-out');
    this.resolve(response);
};

/**
 * 货区列表
 */
module.exports.List = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await BillOutService.getBillMasters(this, params);
        let pageBean = new CustomPageBean(result);
        response.send(pageBean);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};
/**
 * 出库单详情
 */
module.exports.BillOutDetailData = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await BillOutService.getBillDetails(this, params);
        let pageBean = new CustomPageBean(result);
        response.send(pageBean);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/**
 * 新建入库单-页面
 */
module.exports.BillOutAddPage = function () {
    let response = new Response();
    response.render('back/bill/out/create-bill-out');
    this.resolve(response);
};

/**
 * 新建入库单-保存
 */
module.exports.BillOutAddSave = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await BillOutService.save(this, params);

        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/**
 * 审核
 */
module.exports.check = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await BillOutService.check(this, params);

        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/**
 * 确定
 */
module.exports.ok = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await BillOutService.ok(this, params);

        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/**
 * 导出
 */
module.exports.export = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await BillOutService.export(this, params);

        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/**
 * 删除
 */
module.exports.delete = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await BillOutService.delete(this, params);

        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/**
 * 配货
 */
module.exports.prepare = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await BillOutService.prepare(this, params);

        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/**
 * 完成出库
 */
module.exports.complete = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await BillOutService.complete(this, params);

        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};
