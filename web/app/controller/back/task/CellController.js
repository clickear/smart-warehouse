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
 * -页面
 */
module.exports.CellPage = function () {
    let response = new Response();
    response.render('back/task/cell/cell');
    this.resolve(response);
};

/**
 * -页面
 */
module.exports.BarPage = function () {
    let response = new Response();
    response.render('back/task/bar/bar');
    this.resolve(response);
};



