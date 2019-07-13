!'use strict';
let AreaItemController = require('../../../app/controller/back/report/AreaItemController');
AreaItemController = ModelProxy(AreaItemController);
let router = require('express').Router();


router.get('/page', AreaItemController.Page);
router.post('/list',AreaItemController.List);


module.exports = router;
/**
 * Created by Administrator on 2017/11/20.
 */
