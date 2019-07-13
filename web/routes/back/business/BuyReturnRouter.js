!'use strict';
let BuyReturnController = require('../../../app/controller/back/business/BuyReturnController');
BuyReturnController = ModelProxy(BuyReturnController);
let router = require('express').Router();


router.get('/page', BuyReturnController.BuyReturnPage);
router.post('/list',BuyReturnController.List);



module.exports = router;
/**
 * Created by Administrator on 2017/11/20.
 */
