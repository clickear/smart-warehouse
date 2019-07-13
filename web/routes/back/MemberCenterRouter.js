!'use strict';
var multipartMiddleware = require('connect-multiparty')();
let memberCenterController = ModelProxy(require('../../app/controller/back/MemberCenterController'));
let router = require('express').Router();

router.get('/', memberCenterController.memberCenterPage);
router.get('/modify/page', memberCenterController.memberModifyPage);
router.post('/modify/data', memberCenterController.memberCenterData);
router.post('/modify/save', multipartMiddleware, memberCenterController.modifyMember);
router.post('/updatePwd', memberCenterController.updatePwd);

module.exports = router;
