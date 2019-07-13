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

let SellService = require('../../../service/business/SellService');
let logger = require('../../../util/LoggerUtil').logger('SellController.js');

/**
 * 销售-页面
 */
module.exports.SellPage = function () {
    let response = new Response();
    response.render('back/business/sell/bill-out');
    this.resolve(response);
};
/**
 * 入库单详情查看-页面
 */
module.exports.BillSellDetailPage = function () {
    let response = new Response();
    response.render('back/business/sell/detail-bill-out');
    this.resolve(response);
};

/**
 * 单详情查看-shuju
 */
module.exports.BillSellDetailData =async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await  SellService.getBillDetails(this, params);
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
        let result = await SellService.getList(this, params);
        let pageBean = new CustomPageBean(result);
        response.send(pageBean);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};
/**
* 修改
*/
module.exports.Update = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await SellService.update(this, params);
        let pageBean = new CustomPageBean(result);
        response.send(pageBean);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};
/**
 * 删除
 */
module.exports.Delete = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await SellService.delete(this, params);
        let pageBean = new CustomPageBean(result);
        response.send(pageBean);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/**
 * 保存
 */
module.exports.Insert = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await SellService.save(this, params);
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
module.exports.AddPage = async function () {
    let response = new Response();
    response.render('back/business/sell/create-bill-out');
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
        let result = await SellService.check(this, params);

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
        let result = await SellService.ok(this, params);

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
        let result = await SellService.export(this, params);

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
        let result = await SellService.tongji(this, params);

        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};