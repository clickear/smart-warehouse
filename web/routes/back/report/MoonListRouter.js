!'use strict';
let MoonListController = require('../../../app/controller/back/report/MoonListController');
MoonListController = ModelProxy(MoonListController);
let router = require('express').Router();


router.get('/page', MoonListController.Page);
router.post('/list',MoonListController.List);



module.exports = router;
/**
 * Created by Administrator on 2017/11/20.
 */
