!'use strict';
let roleController = require('../../../app/controller/back/organization/RoleController');
roleController = ModelProxy(roleController);
let router = require('express').Router();

router.get('/page', roleController.rolePage);

// 角色列表（不分页）
router.post('/roleList', roleController.getRoleList);
// 一级角色数据
router.post('/pRoleData', roleController.getPRoleData);

// 角色列表
router.post('/list', roleController.roleList);


// 修改-页面
router.get('/modify/page', roleController.modifyRolePage);
// 修改-获取数据
router.post('/modify/data', roleController.getRoleDetailByRoleId);
// 修改
router.post('/modify/save', roleController.modifyRoleByRoleId);


// 新增-页面
router.get('/create/page', roleController.createRolePage);
// 新增-获取数据
router.post('/create/data', roleController.getRoleDetailByPermissionRoleId);
// 新增
router.post('/create/save', roleController.createRole);


module.exports = router;




























