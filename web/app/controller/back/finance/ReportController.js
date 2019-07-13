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

let ReportService = require('../../../service/finance/ReportService');
let logger = require('../../../util/LoggerUtil').logger('BillInController.js');


/**
 * 财务报表-页面
 */
module.exports.ReportPage = function () {
    let response = new Response();
    response.render('back/finance/report/report');
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
        let result = await ReportService.getBillMasters(this, params);
        let pageBean = new CustomPageBean(result);
        response.send(pageBean);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};

