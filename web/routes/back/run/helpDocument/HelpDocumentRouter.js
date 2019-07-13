!'use strict';
let helpDocumentController = require('../../../../app/controller/back/run/HelpDocumentController');
helpDocumentController = ModelProxy(helpDocumentController);
let router = require('express').Router();

router.get('/page',helpDocumentController.helpDocumentPage);

router.post('/list', helpDocumentController.helpDocumentList);
router.post('/category', helpDocumentController.categoryList);
router.get('/create/page', helpDocumentController.createOrModifyPage);
router.post('/create/save', helpDocumentController.createDiscounts);

router.get('/modify/page', helpDocumentController.createOrModifyPage);
router.post('/modify/data', helpDocumentController.getDiscountsById);
router.post('/modify/save', helpDocumentController.modifyDiscountsById);

router.get('/detail/page', helpDocumentController.detailPage);
router.post('/detail/data', helpDocumentController.getDiscountsById);

router.post('/delete', helpDocumentController.deleteDiscountsById);

// // 优惠信息-详情
// router.get('/preferential/page', helpDocumentController.preferentialPage);
// // 再次编辑
// router.get('/compileAgain/page', helpDocumentController.compileAgainPage);
//
// router.get('/', helpDocumentController.preferentialPoliciesPage);

module.exports = router;
