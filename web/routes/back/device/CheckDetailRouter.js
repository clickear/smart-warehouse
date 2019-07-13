!'use strict';
let CheckDetailController = require('../../../app/controller/back/device/CheckDetailController');
CheckDetailController = ModelProxy(CheckDetailController);
let router = require('express').Router();


router.post('/list',CheckDetailController.list);
router.post('/save',CheckDetailController.create);
router.post('/update',CheckDetailController.update);
router.post('/delete',CheckDetailController.delete);


module.exports = router;
/**
 * Created by Administrator on 2017/11/20.
 */
