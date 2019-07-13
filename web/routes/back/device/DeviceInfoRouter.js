!'use strict';
 
 
let DeviceInfoController = require('../../../app/controller/back/device/DeviceInfoController');
DeviceInfoController = ModelProxy(DeviceInfoController);
let router = require('express').Router();


router.get('/page', DeviceInfoController.page);
router.post('/list',DeviceInfoController.list);
router.post('/save',DeviceInfoController.create);
router.post('/update',DeviceInfoController.update);
router.post('/delete',DeviceInfoController.delete);


module.exports = router;
