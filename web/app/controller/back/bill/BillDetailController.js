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

let BillDetailService = require('../../../service/bill/BillDetailService');
let logger = require('../../../util/LoggerUtil').logger('BillDetailController.js');



/**
 *  列表
 */
module.exports.List = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await BillDetailService.list(this, params);
        let pageBean = new CustomPageBean(result);
        response.send(pageBean);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};








/**
 * 更新
 */
module.exports.Update = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await BillDetailService.update(this, params);

        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

/**
 * 更新
 */
module.exports.Accept = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await BillDetailService.accept(this, params);

        response.send(result);
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
        let result = await BillDetailService.delete(this, params);

        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};


