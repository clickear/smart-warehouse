!'use strict';
var multipartMiddleware = require('connect-multiparty')();
let organizationController = require('../../../app/controller/back/organization/OrganizationController');
organizationController = ModelProxy(organizationController);

// 平台网点管理
let platformBranchController = require('../../../app/controller/back/organization/PlatformBranchController');
platformBranchController = ModelProxy(platformBranchController);

// 客户管理
let clientController = require('../../../app/controller/back/organization/ClientController');
clientController = ModelProxy(clientController);

// 供应商管理
let supplierController = require('../../../app/controller/back/organization/SupplierController');
supplierController = ModelProxy(supplierController);

// 投资商管理
let investorController = require('../../../app/controller/back/organization/InvestorController');
investorController = ModelProxy(investorController);

// 代理商管理
let agentController = require('../../../app/controller/back/organization/AgentController');
agentController = ModelProxy(agentController);

// POI管理
let poiController = require('../../../app/controller/back/organization/PoiController');
poiController = ModelProxy(poiController);

let router = require('express').Router();

// 账户管理
let accountRouter = require('./AccountRouter');
router.use('/account', accountRouter);

// 角色管理
let roleRouter = require('./RoleRouter');
router.use('/role', roleRouter);


// 机构管理 ------------------------------------------------------------------------------------------------------------
router.get('/', organizationController.organizationPage);

// 获取机构列表
router.post('/companyList', organizationController.getCompanyList);

// 平台网点管理 ========================================================================================================
// 页面
router.get('/platformBranch/page', platformBranchController.platformBranchPage);
// 列表数据
router.post('/platformBranch/list', platformBranchController.getStorageListPaging);
// 新增
router.get('/platformBranch/create/page', platformBranchController.createPlatformBranchPage);
// 保存
router.post('/platformBranch/create/save', platformBranchController.createPlatformBranch);
// 详情
router.get('/platformBranch/detail/page', platformBranchController.detailPlatformBranchPage);
// 获取数据
router.post('/platformBranch/detail/data', platformBranchController.detailPlatformBranch);
// 修改
router.get('/platformBranch/modify/page', platformBranchController.modifyPlatformBranchPage);
// 获取数据
/*router.post('/platformBranch/modify/data', platformBranchController.modifyPlatformBranch);*/
// 保存
router.post('/platformBranch/modify/save', platformBranchController.modifyPlatformBranch);

// 客户管理 ============================================================================================================
// 页面
router.get('/client/page', clientController.clientPage);
// 列表数据
router.post('/client/list', organizationController.getCompanyListPaging);

// 详情
router.get('/client/detail/page', clientController.detailPage);
// 获取数据
router.post('/client/detail/data', organizationController.getCompanyByCompanyId);

// 新增-客户
router.get('/client/create/page', clientController.createClientPage);
// 保存新增-客户
router.post('/client/create/save', multipartMiddleware, organizationController.createCompany);

// 修改
router.get('/client/modify/page', clientController.modifyPage);
// 获取数据
router.post('/client/modify/data', organizationController.getCompanyByCompanyId);
// 保存
router.post('/client/modify/save', multipartMiddleware, organizationController.modifyCompanyByCompanyId);

// 仓储点管理 -------------------------------------------------------------------------------------
router.get('/client/storage/page', clientController.storagePage);
// 仓储点-列表
router.post('/client/storage/list', organizationController.getStorageListPaging);

// 仓储点-详情
router.get('/client/storage/detail/page', clientController.storageDetailPage);
// 获取详情数据
router.post('/client/storage/detail/data', organizationController.getStorageByStorageId);

// 新增-仓储点
router.get('/client/storage/create/page', clientController.createStoragePage);
// 保存
router.post('/client/storage/create/save', organizationController.createStorage);

// 修改-仓储点
router.get('/client/storage/modify/page', clientController.modifyStoragePage);
// 获取数据
router.post('/client/storage/modify/data', organizationController.getStorageByStorageId);
// 保存
router.post('/client/storage/modify/save', organizationController.modifyStorageByStorageId);

// 删除-仓储点
router.post('/client/storage/delete', organizationController.deleteStorageByStorageId);


// 供应商管理 ==========================================================================================================
router.get('/supplier/page', supplierController.clientPage);
// 列表数据
router.post('/supplier/list', organizationController.getCompanyListPaging);

// 详情
router.get('/supplier/detail/page', supplierController.detailPage);
// 获取数据
router.post('/supplier/detail/data', organizationController.getCompanyByCompanyId);

// 新增-供应商
router.get('/supplier/create/page', supplierController.createSupplierPage);
// 保存-新增-供应商
router.post('/supplier/create/save', multipartMiddleware, organizationController.createCompany);

// 修改
router.get('/supplier/modify/page', supplierController.modifyPage);
// 获取数据
router.post('/supplier/modify/data', organizationController.getCompanyByCompanyId);
// 保存
router.post('/supplier/modify/save', multipartMiddleware, organizationController.modifyCompanyByCompanyId);


// 投资商管理 ==========================================================================================================
router.get('/investor/page', investorController.investorPage);
// 列表数据
router.post('/investor/list', organizationController.getCompanyListPaging);

// 详情
router.get('/investor/detail/page', investorController.detailPage);
// 获取数据
router.post('/investor/detail/data', organizationController.getCompanyByCompanyId);

// 新增-客户
router.get('/investor/create/page', investorController.createInvestorPage);
// 新增-客户
router.post('/investor/create/save', multipartMiddleware, organizationController.createCompany);

// 修改
router.get('/investor/modify/page', investorController.modifyPage);
// 获取数据
router.post('/investor/modify/data', organizationController.getCompanyByCompanyId);
// 保存
router.post('/investor/modify/save', multipartMiddleware, organizationController.modifyCompanyByCompanyId);


// 代理商管理 ============================================================================================================
// 页面
router.get('/agent/page', agentController.agentPage);
// 列表数据
router.post('/agent/list', organizationController.getCompanyListPaging);

// 详情
router.get('/agent/detail/page', agentController.detailPage);
// 获取数据
router.post('/agent/detail/data', organizationController.getCompanyByCompanyId);

// 新增-代理商管理
router.get('/agent/create/page', agentController.createAgentPage);
// 新增-代理商管理
router.post('/agent/create/save', multipartMiddleware, organizationController.createCompany);

// 修改
router.get('/agent/modify/page', agentController.modifyPage);
// 获取数据
router.post('/agent/modify/data', organizationController.getCompanyByCompanyId);
// 保存
router.post('/agent/modify/save', multipartMiddleware, organizationController.modifyCompanyByCompanyId);

// 仓储点管理 -------------------------------------------------------------------------------------
router.get('/agent/storage/page', agentController.storagePage);
router.post('/agent/storage/list', organizationController.getStorageListPaging);

// 仓储点-详情
router.get('/agent/storage/detail/page', agentController.storageDetailPage);
// 获取详情数据
router.post('/agent/storage/detail/data', organizationController.getStorageByStorageId);

// 新增-仓储点
router.get('/agent/storage/create/page', agentController.createStoragePage);
// 保存
router.post('/agent/storage/create/save', organizationController.createStorage);

// 修改-仓储点
router.get('/agent/storage/modify/page', agentController.modifyStoragePage);
// 获取数据
router.post('/agent/storage/modify/data', organizationController.getStorageByStorageId);
// 保存
router.post('/agent/storage/modify/save', organizationController.modifyStorageByStorageId);

// 删除-仓储点
router.post('/agent/storage/delete', organizationController.deleteStorageByStorageId);

// POI管理 ==========================================================================================================
router.get('/poi/page', poiController.poiPage);
// 列表数据
router.post('/poi/list', organizationController.getCompanyListPaging);

// 详情
router.get('/poi/detail/page', poiController.detailPage);
// 获取数据
router.post('/poi/detail/data', organizationController.getCompanyByCompanyId);

// 新增-客户
router.get('/poi/create/page', poiController.createPoiPage);
// 新增-POI客户
router.post('/poi/create/save', multipartMiddleware, organizationController.createCompany);

// 修改
router.get('/poi/modify/page', poiController.modifyPage);
// 获取数据
router.post('/poi/modify/data', organizationController.getCompanyByCompanyId);
// 保存
router.post('/poi/modify/save', multipartMiddleware, organizationController.modifyCompanyByCompanyId);


module.exports = router;