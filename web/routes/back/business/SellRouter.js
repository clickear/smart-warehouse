!'use strict';
let SellController = require('../../../app/controller/back/business/SellController');
SellController = ModelProxy(SellController);
let router = require('express').Router();


router.get('/page', SellController.SellPage);
router.post('/list',SellController.List);



module.exports = router;
/**
 * Created by Administrator on 2017/11/20.
 */
