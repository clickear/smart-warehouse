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

let BuyReturnService = require('../../../service/business/BuyReturnService');
let logger = require('../../../util/LoggerUtil').logger('BillInController.js');

/**
 * 采购退货-页面
 */
module.exports.BuyReturnPage = function () {
    let response = new Response();
    response.render('back/business/buy-return/buy-return');
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
 * 货区列表
 */
module.exports.List = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await BuyReturnService.getBillMasters(this, params);
        let pageBean = new CustomPageBean(result);
        response.send(pageBean);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

