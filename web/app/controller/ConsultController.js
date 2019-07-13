'use strict';
let Response = require('../model/Response');
let consultService = require('../service/ConsultService');

module.exports.createConsult = async function () {
    let req = this.req;
    let params = req.body;
    let response = new Response();
    try {
        let result = await consultService.createConsult(this, params);
        response.send(result);
    } catch (error) {
        logger.error(error);
    }
    this.resolve(response);
};