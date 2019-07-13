!'use strict';
let OutController = require('../../../app/controller/back/finance/OutController');
OutController = ModelProxy(OutController);
let router = require('express').Router();


router.get('/page', OutController.OutPage);
router.post('/list',OutController.List);
router.post('/delete',OutController.Delete);
router.post('/update',OutController.Update);
router.post('/save',OutController.Save);


module.exports = router;
/**
 * Created by Administrator on 2017/11/20.
 */
