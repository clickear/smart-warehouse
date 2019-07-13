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

let BillAllotService = require('../../../service/bill/BillAllotService');
let BillInService = require('../../../service/bill/BillInService');
let logger = require('../../../util/LoggerUtil').logger('BillAllotController.js');

/**
 * 调拨单查看-页面
 */
module.exports.BillAllotPage = function () {
    let response = new Response();
    response.render('back/bill/allot/bill-allot');
    this.resolve(response);
};
/**
 * 调拨单详情查看-页面
 */
module.exports.BillAllotDetailPage = function () {
    let response = new Response();
    response.render('back/bill/allot/detail-bill-allot');
    this.resolve(response);
};
/**
 * 调拨单新建-页面
 */
module.exports.add = function () {
    let response = new Response();
    response.render('back/bill/allot/create-bill-allot');
    this.resolve(response);
};

/**
 * 列表
 */
module.exports.List = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await BillAllotService.getBillMasters(this, params);
        let pageBean = new CustomPageBean(result);
        response.send(pageBean);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};
/**
 * 入库单主数据数据
 */
module.exports.BillAllotDetailData = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await BillAllotService.getBillMasters(this, params);

        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};


/**
 * 新建-保存
 */
module.exports.save = async function () {
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
