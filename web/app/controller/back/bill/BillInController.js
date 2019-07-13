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

let BillInService = require('../../../service/bill/BillInService');
let logger = require('../../../util/LoggerUtil').logger('BillInController.js');

/**
 * 入库单查看-页面
 */
module.exports.BillInPage = function () {
    let response = new Response();
    response.render('back/bill/in/bill-in');
    this.resolve(response);
};
/**
 * 入库单详情查看-页面
 */
module.exports.BillInDetailPage = function () {
    let response = new Response();
    response.render('back/bill/in/detail-bill-in');
    this.resolve(response);
};

/**
 * 入库单详情查看-shuju
 */
module.exports.BillInDetailData =async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await  BillInService.getBillDetails(this, params);
        let pageBean = new CustomPageBean(result);
        response.send(pageBean);
    } catch (error) {
        logger.error(error);
    }
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
        let result = await BillInService.getBillMasters(this, params);
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
module.exports.BillInAddPage = function () {
    let response = new Response();
    response.render('back/bill/in/create-bill-in');
    this.resolve(response);
};

/**
 * 新建入库单-保存
 */
module.exports.BillInAddSave = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await BillInService.save(this, params);

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
        let result = await BillInService.check(this, params);

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
        let result = await BillInService.ok(this, params);

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
        let result = await BillInService.export(this, params);

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
        let result = await BillInService.delete(this, params);

        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/**
 * 统计
 */
module.exports.tongji = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await BillInService.tongji(this, params);

        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/**
 * 统计
 */
module.exports.accept = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await BillInService.accept(this, params);

        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};