!'use strict';
let warnController = require('../../../app/controller/back/system/WarnController');
warnController = ModelProxy(warnController);
let router = require('express').Router();

router.get('/page', warnController.warnPage);
router.post('/list', warnController.getWarnListPaging);

router.get('/detail/page', warnController.detailPage);
router.post('/detail/data', warnController.getWarnById);

router.get('/create/page', warnController.createOrModifyPage);
router.post('/create/save', warnController.createWarn);

router.get('/modify/page', warnController.createOrModifyPage);
router.post('/modify/data', warnController.getWarnById);
router.post('/modify/save', warnController.modifyWarnById);

router.post('/delete', warnController.deleteWarnById);

router.post('/enabled', warnController.enabledWarnById); // 启用

router.post('/disabled', warnController.disabledWarnById); // 禁用

module.exports = router;
