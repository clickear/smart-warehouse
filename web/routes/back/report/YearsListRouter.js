!'use strict';
let YearsListController = require('../../../app/controller/back/report/YearsListController');
YearsListController = ModelProxy(YearsListController);
let router = require('express').Router();


router.get('/page', YearsListController.Page);
router.post('/list',YearsListController.List);



module.exports = router;
/**
 * Created by Administrator on 2017/11/20.
 */
