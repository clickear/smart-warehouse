'use strict';
let Response = require('../../../model/Response');
let RestifyProxy = require('../../../util/RestifyProxy');
let CustomPageBean = require('../../../model/CustomPageBean');
let ClientService = require('../../../service/agency/ClientService');
let logger = require('../../../util/LoggerUtil').logger('ClientController.js');
/**
 * 客户页面
 */
module.exports.clientPage = function () {
    let response = new Response();
    response.render('back/agency/client/client');
    this.resolve(response);
};
/**
 * 客户列表
 */
module.exports.List = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await ClientService.getClient(this, params);
        let pageBean = new CustomPageBean(result);
        response.send(pageBean);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};
/*
 * 保存
 */
module.exports.Save = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await ClientService.createClient(this, params);
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
        let result = await ClientService.updateClient(this, params);
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
        let result = await ClientService.deleteClient(this, params);
        let pageBean = new CustomPageBean(result);
        response.send(pageBean);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};
