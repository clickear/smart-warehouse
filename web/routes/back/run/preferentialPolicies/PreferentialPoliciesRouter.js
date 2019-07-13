!'use strict';
let preferentialPoliciesController = require('../../../../app/controller/back/run/preferentialPolicies/PreferentialPoliciesController');
preferentialPoliciesController = ModelProxy(preferentialPoliciesController);
let router = require('express').Router();

router.get('/page',preferentialPoliciesController.preferentialPoliciesPage);

router.post('/list', preferentialPoliciesController.policiesList);

router.get('/create/page', preferentialPoliciesController.createOrModifyPage);
router.post('/create/save', preferentialPoliciesController.createDiscounts);

router.get('/modify/page', preferentialPoliciesController.createOrModifyPage);
router.post('/modify/data', preferentialPoliciesController.getDiscountsById);
router.post('/modify/save', preferentialPoliciesController.modifyDiscountsById);

router.get('/detail/page', preferentialPoliciesController.detailPage);
router.get('/detail/data', preferentialPoliciesController.getDiscountsById);

router.post('/delete', preferentialPoliciesController.deleteDiscountsById);

// // 优惠信息-详情
// router.get('/preferential/page', preferentialPoliciesController.preferentialPage);
// // 再次编辑
// router.get('/compileAgain/page', preferentialPoliciesController.compileAgainPage);
//
// router.get('/', preferentialPoliciesController.preferentialPoliciesPage);

module.exports = router;
