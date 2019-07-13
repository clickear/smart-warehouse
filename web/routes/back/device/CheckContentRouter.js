!'use strict';
let CheckContentController = require('../../../app/controller/back/device/CheckContentController');
CheckContentController = ModelProxy(CheckContentController);
let router = require('express').Router();


router.get('/page', CheckContentController.page);
router.post('/list',CheckContentController.list);
router.post('/save',CheckContentController.create);
router.post('/update',CheckContentController.update);
router.post('/delete',CheckContentController.delete);


module.exports = router;
/**
 * Created by Administrator on 2017/11/20.
 */
