!'use strict';
let DayListController = require('../../../app/controller/back/report/DayListController');
DayListController = ModelProxy(DayListController);
let router = require('express').Router();


router.get('/page', DayListController.Page);
router.post('/list',DayListController.List);



module.exports = router;
/**
 * Created by Administrator on 2017/11/20.
 */
