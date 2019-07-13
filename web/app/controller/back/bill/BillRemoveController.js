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

let BillRemoveService = require('../../../service/bill/BillRemoveService');
let logger = require('../../../util/LoggerUtil').logger('BillInController.js');

/**
 * 移库单单查看-页面
 */
module.exports.BillRemovePage = function () {
    let response = new Response();
    response.render('back/bill/remove/bill-remove');
    this.resolve(response);
};
/**
 * 出库单详情查看-页面
 */
module.exports.BillRemoveDetailPage = function () {
    let response = new Response();
    response.render('back/bill/remove/detail-bill-remove');
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
        let result = await BillRemoveService.getBillMasters(this, params);
        let pageBean = new CustomPageBean(result);
        response.send(pageBean);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};
/**
 *
 */
module.exports.BillRemoveDetailData = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await BillRemoveService.getBillDetails(this, params);

        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/**
 * 新建移库单-页面
 */
module.exports.BillRemoveAddPage = function () {
    let response = new Response();
    response.render('back/bill/remove/create-bill-remove');
    this.resolve(response);
};

/**
 * 新建移库单-保存
 */
module.exports.BillRemoveAddSave = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await BillService.save(this, params);

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
        let result = await BillRemoveService.check(this, params);

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
        let result = await BillRemoveService.ok(this, params);

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
        let result = await BillRemoveService.export(this, params);

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
        let result = await BillRemoveService.delete(this, params);

        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

