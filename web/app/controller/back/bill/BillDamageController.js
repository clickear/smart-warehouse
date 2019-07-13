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
// let ScanResultsService = require('../../../service/ScanResultsService');
let BillDamageService = require('../../../service/bill/BillDamageService');
let logger = require('../../../util/LoggerUtil').logger('BillInController.js');

/**
 * 报损单查看-页面
 */
module.exports.BillDamagePage = function () {
    let response = new Response();
    response.render('back/bill/damage/bill-damage');
    this.resolve(response);
};
/**
 * 报损单详情查看-页面
 */
module.exports.BillDamageDetailPage = function () {
    let response = new Response();
    response.render('back/bill/damage/detail-bill-damage');
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
        let result = await BillDamageService.getBillMasters(this, params);
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
module.exports.BillDamageDetailData = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await BillDamageService.getBillDetails(this, params);
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
module.exports.BillDamageAddPage = function () {
    let response = new Response();
    response.render('back/bill/damage/create-bill-damage');
    this.resolve(response);
};

/**
 * 新建入库单-保存
 */
module.exports.BillDamageAddSave = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await BillDamageService.save(this, params);

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
        let result = await BillDamageService.check(this, params);

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
        let result = await BillDamageService.ok(this, params);

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
        let result = await BillDamageService.export(this, params);

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

