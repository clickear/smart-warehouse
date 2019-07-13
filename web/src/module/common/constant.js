(function () {
    const URI = {
        HOMEPAGE: {
            PAGE: '/back/homepage/page',
            STATUS_DATA: '/back/homepage/statusData', // 状态数据
            DISTRIBUTION_DATA: '/back/homepage/distributionData', // 分布数据
            INVENTORY_WARNING: {
                LIST: '/back/homepage/inventoryWarning/list',
                CONFIRM:'/back/homepage/backlog/confirm',
                READ:'/back/homepage/backlog/read'
            }
        },
        CUSTOMER: { // 咨询管理
            LIST: '/back/customerService/list',
            DETAIL: { // 详情
                PAGE: '/back/customerService/customerServiceinfo/page', // 页面
                DATA:'/back/customerService/customerServiceinfo/data',
                SAVE:'/back/customerService/customerServiceinfo/reply'
            },
            SEND:'/back/customerService/customerServiceinfo/send',
            MSGLIST:'/back/customerService/customerServiceinfo/list'
        },
        MESSAGEBACKLOG:{//消息待办
            PAGE: '/back/messageBacklog/page',
            LIST: '/back/messageBacklog/list',
            READ:'/back/messageBacklog/read',
            DETAIL:{//详情
                PAGE:'/back/messageBacklog/messageinfo/page',
                DATA:'/back/messageBacklog/messageinfo/data',
            }
        },
        HELP:{//帮助中心
            DATA: '/back/help/data',
            DETAIL:{
                PAGE:'/back/help/detail-page'
            }
        },
        ORGANIZATION: {
            COMPANY_LIST: '/back/organization/companyList', // 获取机构（公司）列表
            ACCOUNT: { // 账户管理
                PAGE: '/back/organization/account/page', // 账户管理-页面
                LIST: '/back/organization/account/list', // 账户管理-列表
                CLIENT_CREATE_ACCOUNT: { // 客户-创建账户
                    PAGE: '/back/organization/account/clientCreateAccount/page', // 页面
                    SAVE: '/back/organization/account/clientCreateAccount/save' // 保存
                },
                PLATFORM_CREATE_ACCOUNT: { // 平台-创建账户
                    PAGE: '/back/organization/account/platformCreateAccount/page', // 页面
                    SAVE: '/back/organization/account/platformCreateAccount/save' // 保存
                },
                DETAIL: { // 账户详情
                    PAGE: '/back/organization/account/detail/page', // 页面
                    DATA: '/back/organization/account/detail/data' // 获取数据
                },
                MODIFY: { // 修改
                    PAGE: '/back/organization/account/modify/page', // 页面
                    DATA: '/back/organization/account/modify/data', // 获取数据
                    SAVE: '/back/organization/account/modify/save' // 保存修改
                },
                DELETE: '/back/organization/account/delete', // 删除账户
                ENABLED: '/back/organization/account/enabled', // 启用账户
                DISABLED: '/back/organization/account/disabled' // 禁用账户
            },
            ROLE: { // 角色管理
                PAGE: '/back/organization/role/page', // 页面
                LIST: '/back/organization/role/list', // 列表
                ROLE_LIST: '/back/organization/role/roleList', // 获取角色列表（不分页）
                P_ROLE_DATA: '/back/organization/role/pRoleData', // 获取一级角色集合
                MODIFY: { // 修改
                    PAGE: '/back/organization/role/modify/page', // 页面
                    DATA: '/back/organization/role/modify/data', // 获取数据
                    SAVE: '/back/organization/role/modify/save' // 保存修改
                },
                CREATE: { // 新增
                    PAGE: '/back/organization/role/create/page', // 页面
                    DATA: '/back/organization/role/create/data', // 获取数据
                    SAVE: '/back/organization/role/create/save' // 保存新增
                }
            },
            PLATFORM_BRANCH: { // 机构管理-平台网点管理
                PAGE: '/back/organization/platformBranch/page', // 页面
                LIST: '/back/organization/platformBranch/list', // 列表数据
                CREATE_PLATFORM_BRANCH: { // 新增-平台网点
                    PAGE: '/back/organization/platformBranch/create/page', // 页面
                    SAVE: '/back/organization/platformBranch/create/save' // 保存
                },
                DETAIL: { // 详情
                    PAGE: '/back/organization/platformBranch/detail/page', // 页面
                    DATA: '/back/organization/platformBranch/detail/data' // 获取数据
                },
                MODIFY: { // 修改
                    PAGE: '/back/organization/platformBranch/modify/page', // 页面
                    SAVE: '/back/organization/platformBranch/modify/save' // 保存修改
                }
            },
            CLIENT: { // 客户管理
                PAGE: '/back/organization/client/page', // 页面
                LIST: '/back/organization/client/list', // 列表数据
                DETAIL: { // 详情
                    PAGE: '/back/organization/client/detail/page', // 页面
                    DATA: '/back/organization/client/detail/data' // 获取数据
                },
                CREATE: { // 新增
                    PAGE: '/back/organization/client/create/page', // 页面
                    SAVE: '/back/organization/client/create/save' // 保存
                },
                MODIFY: { // 修改
                    PAGE: '/back/organization/client/modify/page', // 页面
                    DATA: '/back/organization/client/modify/data', // 获取数据
                    SAVE: '/back/organization/client/modify/save' // 保存修改
                },
                STORAGE: { // 仓储点管理（通过客户ID获取仓储点）
                    PAGE: '/back/organization/client/storage/page', // 页面
                    LIST: '/back/organization/client/storage/list', // 列表数据
                    DETAIL: { // 详情
                        PAGE: '/back/organization/client/storage/detail/page', // 页面
                        DATA: '/back/organization/client/storage/detail/data' // 获取数据
                    },
                    CREATE: { // 新增
                        PAGE: '/back/organization/client/storage/create/page', // 页面
                        SAVE: '/back/organization/client/storage/create/save' // 保存
                    },
                    MODIFY: { // 修改
                        PAGE: '/back/organization/client/storage/modify/page', // 页面
                        DATA: '/back/organization/client/storage/modify/data', // 获取数据
                        SAVE: '/back/organization/client/storage/modify/save' // 保存修改
                    },
                    DELETE: '/back/organization/client/storage/delete' // 删除-仓储点
                }
            },
            SUPPLIER: { // 供应商管理
                PAGE: '/back/organization/supplier/page', // 页面
                LIST: '/back/organization/supplier/list', // 列表数据
                DETAIL: { // 详情
                    PAGE: '/back/organization/supplier/detail/page', // 页面
                    DATA: '/back/organization/supplier/detail/data' // 获取数据
                },
                CREATE: { // 新增
                    PAGE: '/back/organization/supplier/create/page', // 页面
                    SAVE: '/back/organization/supplier/create/save' // 保存
                },
                MODIFY: { // 修改
                    PAGE: '/back/organization/supplier/modify/page', // 页面
                    DATA: '/back/organization/supplier/modify/data', // 获取数据
                    SAVE: '/back/organization/supplier/modify/save' // 保存修改
                }
            },
            INVESTOR: { // 投资商管理
                PAGE: '/back/organization/investor/page', // 页面
                LIST: '/back/organization/investor/list', // 列表数据
                DETAIL: { // 详情
                    PAGE: '/back/organization/investor/detail/page', // 页面
                    DATA: '/back/organization/investor/detail/data' // 获取数据
                },
                CREATE: { // 新增
                    PAGE: '/back/organization/investor/create/page', // 页面
                    SAVE: '/back/organization/investor/create/save' // 保存
                },
                MODIFY: { // 修改
                    PAGE: '/back/organization/investor/modify/page', // 页面
                    DATA: '/back/organization/investor/modify/data', // 获取数据
                    SAVE: '/back/organization/investor/modify/save' // 保存修改
                }
            },
            AGENT: { // 代理商管理
                PAGE: '/back/organization/agent/page', // 页面
                LIST: '/back/organization/agent/list', // 列表数据
                DETAIL: { // 详情
                    PAGE: '/back/organization/agent/detail/page', // 页面
                    DATA: '/back/organization/agent/detail/data' // 获取数据
                },
                CREATE: { // 新增
                    PAGE: '/back/organization/agent/create/page', // 页面
                    SAVE: '/back/organization/agent/create/save' // 保存
                },
                MODIFY: { // 修改
                    PAGE: '/back/organization/agent/modify/page', // 页面
                    DATA: '/back/organization/agent/modify/data', // 获取数据
                    SAVE: '/back/organization/agent/modify/save' // 保存修改
                },
                STORAGE: { // 仓储点管理（通过客户ID获取仓储点）
                    PAGE: '/back/organization/agent/storage/page', // 页面
                    LIST: '/back/organization/agent/storage/list', // 列表数据
                    DETAIL: { // 详情
                        PAGE: '/back/organization/agent/storage/detail/page', // 页面
                        DATA: '/back/organization/agent/storage/detail/data' // 获取数据
                    },
                    CREATE: { // 新增
                        PAGE: '/back/organization/agent/storage/create/page', // 页面
                        SAVE: '/back/organization/agent/storage/create/save' // 保存
                    },
                    MODIFY: { // 修改
                        PAGE: '/back/organization/agent/storage/modify/page', // 页面
                        DATA: '/back/organization/agent/storage/modify/data', // 获取数据
                        SAVE: '/back/organization/agent/storage/modify/save' // 保存修改
                    },
                    DELETE: '/back/organization/agent/storage/delete' // 删除-仓储点
                }
            },
            POI: { // POI管理
                PAGE: '/back/organization/poi/page', // 页面
                LIST: '/back/organization/poi/list', // 列表数据
                DETAIL: { // 详情
                    PAGE: '/back/organization/poi/detail/page', // 页面
                    DATA: '/back/organization/poi/detail/data' // 获取数据
                },
                CREATE: { // 新增
                    PAGE: '/back/organization/poi/create/page', // 页面
                    SAVE: '/back/organization/poi/create/save' // 保存
                },
                MODIFY: { // 修改
                    PAGE: '/back/organization/poi/modify/page', // 页面
                    DATA: '/back/organization/poi/modify/data', // 获取数据
                    SAVE: '/back/organization/poi/modify/save' // 保存修改
                }
            }
        },
        RENT: {
            RENTAL: {
                PAGE: '/back/rent/rental/page', // 列表页面
                LIST: '/back/rent/rental/list', // 列表页面
                DETAIL: {
                    PAGE: '/back/rent/rental/detailRental/page', // 详情页面
                    DATA: '/back/rent/rental/detailRental/data', // 获取数据
                    EXPORT:'/back/rent/rental/detailRental/export',  //订单导出
                    RENTDATA: '/back/rent/rental/detailRental/rent', // 获取租金，保证金计算数据
                    GET_COST:'/back/rent/rental/detailRental/getCost',  //计算
                    CANCLE_ORDER:'/back/rent/rental/detailRental/cancle',
                    RECOVER_ORDER:'/back/rent/rental/detailRental/recover', //恢复订单,
                    SURE_ORDER:'/back/rent/rental/detailRental/sureOrder',  //审核
                    EDIT_SAVE:'/back/rent/rental/detailRental/editSave',
                    BINDORDER:{  //绑定生产单
                       PAGE:'/back/rent/rental/detailRental/bind/page',
                        LIST:'/back/rent/rental/detailRental/bind/list',  //已绑定列表
                        CANLIST:'/back/rent/rental/detailRental/bind/Canlist', //可绑定列表,
                        SUBMIT:'/back/rent/rental/detailRental/bind/SubmitList'
                    },
                    OFFORDER:{
                        PAGE:'/back/rent/rental/detailRental/off/page',
                        OFF:'/back/rent/rental/detailRental/off/bindOff'
                    },   //解除绑定
                    CHANGEORDER: {
                        PAGE: '/back/rent/rental/changeOrder/page' , //详情页面-变更记录
                        DATA: '/back/rent/rental/changeOrder/data', // 获取数据
                        RENTDATA: '/back/rent/rental/detailRental/rent', // 获取租金，保证金计算数据
                        LIST1: '/back/rent/rental/changeOrder/Rentallist', // 列表页面
                        LIST2: '/back/rent/rental/changeOrder/Reternlist', // 列表页面
                        LIST3: '/back/rent/rental/changeOrder/subletlist', // 列表页面
                    },
                    CONTRACTMANAGEMENT: {
                        LIST: '/back/rent/rental/contractManagement/list', // 列表页面
                        PAGE: '/back/rent/rental/contractManagement/page' , //详情页面-合同管理页面
                        PREVIEW: '/back/rent/rental/contractManagement/preview' , //详情页面-合同管理-预览
                        UPLOAD:'/back/rent/rental/contractManagement/upload'//详情页面-合同管理-上传
                    }

                },
                CLIENT_CREATE_RENTAL: { // 创建订单续租
                    PAGE: '/back/rent/rental/clientCreateRental/page' // 页面
                    /*SAVE: '/back/organization/account/clientCreateAccount/save' // 保存*/
                },
                CLIENT_NEXT_RENTAL: { // 下一步创建订单续租
                    PAGE: '/back/rent/rental/clientNextRental/page', // 页面
                    SAVE: '/back/rent/rental/clientNextRental/save' // 保存页面
                    /*SAVE: '/back/organization/account/clientCreateAccount/save' // 保存*/
                }
            },
            ALLOCATION: {
                PAGE: 'back/rent/allocation/page',
                LIST: 'back/rent/allocation/list',
                DETAIL: {
                    PAGE: '/back/rent/allocation/detailAllocation/page', // 详情页面
                    DATA: '/back/rent/allocation/detailAllocation/data', // 获取数据
                    CONTRACTMANAGEMENT: {
                        PAGE: '/back/rent/allocation/contractManagement/page' , //详情页面-合同管理页面
                        PREVIEW: '/back/rent/allocation/contractManagement/preview'  //详情页面-合同管理-预览
                    },
                    SUREORDER: {
                        PAGE: '/back/rent/allocation/sureOrder/page',  //详情页面-订单确认
                        STORAGE_TREE:'/back/rent/allocation/sureOrder/tree',
                        ALLOCATION_CONFIRM:'/back/rent/allocation/sureOrder/confirm' //执行订单确认
                    },
                }
            },
            TRACKING: {
                PAGE: 'back/rent/tracking/page',
                LIST: 'back/rent/tracking/list', // 订单信息列表
                CREATE:{
                     PAGE:'back/rent/tracking/create/page',
                     INFO:'back/rent/tracking/create/info',
                     SAVE:'back/rent/tracking/create/save',
                },
                DETAIL: {
                    PAGE: '/back/rent/tracking/detailTracking/page',// 详情页面
                    DATA: '/back/rent/tracking/detailTracking/data' ,// 获取数据
                    EXPORT:'/back/rent/tracking/detailTracking/export',
                    EDIT:'/back/rent/tracking/detailTracking/edit',
                    BIND:{
                        PAGE:'/back/rent/tracking/detailTracking/bind/page',
                        LIST:'/back/rent/tracking/detailTracking/bind/list',
                        SUBMIT:'/back/rent/tracking/detailTracking/bind/submit',
                        INFO:'/back/rent/tracking/detailTracking/bind/info',
                        INFO_LIST:'/back/rent/tracking/detailTracking/bind/infoList'
                    },
                    OFF_BIND:'/back/rent/tracking/detailTracking/off_bind',
                    CANCLE_ORDER:'/back/rent/tracking/detailTracking/cancleOrder',
                    RECOVER_ORDER:'/back/rent/tracking/detailTracking/recoverOrder'
                },
                TRAY_INFO: {
                    PAGE: '/back/rent/tracking/trayInfo/page', // 托盘信息页面
                    LIST: '/back/rent/tracking/trayInfo/list', // 托盘信息列表
                    TIMELY_LOCATION: {
                        PAGE: '/back/rent/tracking/timelyLocation/page' //实时位置页面
                    }
                },
                LOCATION_INFO: {
                    PAGE: '/back/rent/tracking/locationInfo/page' // 位置信息页面
                },
                ALARM_RECORD: {
                    PAGE: '/back/rent/tracking/alarmRecord/page', // 告警记录页面
                    LIST: '/back/rent/tracking/alarmRecord/list' // 告警记录数据
                },
                SET_RANGE: {
                    PAGE: '/back/rent/tracking/setRange/page' // 设置范围页面
                },
                ELETIC_RANGE: {
                    PAGE: '/back/rent/tracking/eleticRange/page' // 位置跟踪页面
                }
            },
            RELET: {
                PAGE: 'back/rent/relet/page',
                LIST: 'back/rent/relet/list',
                NEXT_LIST:'back/rent/relet/nextlist',
                DETAIL: {
                    PAGE: '/back/rent/relet/detailRelet/page', // 详情页面
                    DATA: '/back/rent/relet/detailRelet/data', // 详情页面数据
                    RELET_CONFIRM:'/back/rent/relet/detailRelet/confirm', //续租确认
                    RELET_RETURN:'/back/rent/relet/detailRelet/return', //废弃订单
                    RELET_RECOVER:'/back/rent/relet/detailRelet/recover',   //恢复订单
                    ONE_KEY:'/back/rent/relet/detailRelet/oneKey',
                    EDIT_SAVE:'/back/rent/relet/detailRelet/editSave',
                    RELET_OTHER:{
                        PAGE:'/back/rent/relet/detailRelet/reletReturn/page',
                        ORGIN_ORDER:'/back/rent/relet/detailRelet/reletReturn/orginOrder',
                        RETURN_SAVE:'/back/rent/relet/detailRelet/reletReturn/returnSave'
                    },
                    CONTRACTMANAGEMENT: {
                        PAGE: '/back/rent/relet/contractManagement/page',  //详情页面-合同管理
                        PREVIEW: '/back/rent/relet/contractManagement/preview'  //详情页面-合同管理-预览
                    }
                },
                CLIENT_CREATE_RELET: { // 创建订单续租
                    PAGE: '/back/rent/relet/clientCreateRelet/page' // 页面

                },
                NEXT_CREATE_RELET: { // 创建订单续租下一步
                    PAGE: '/back/rent/relet/nextCreateRelet/page', // 页面
                    SAVE: '/back/rent/relet/nextCreateRelet/save' // 页面
                },
                NEXT_SURE_ORDER:{
                    PAGE: '/back/rent/relet/nextSureOrder/page', // 页面
                }
            },
            SUBLET: {
                PAGE: 'back/rent/sublet/page',
                LIST: 'back/rent/sublet/list',
                DETAIL: {
                    PAGE: '/back/rent/sublet/detailSublet/page', // 详情页面
                    DATA: '/back/rent/sublet/detailSublet/data', // 详情页面数据查询
                    GET_COST:'/back/rent/sublet/detailSublet/getCost',  //费用预估按钮
                    AUDIT: '/back/rent/sublet/detailSublet/audit', //审核按钮
                    MODIFY: '/back/rent/sublet/detailSublet/modify', //修改按钮
                    DISCARD: '/back/rent/sublet/detailSublet/discard', //废弃按钮
                    RECOVERY: '/back/rent/sublet/detailSublet/recovery', //恢复按钮
                    OneKey: '/back/rent/sublet/detailSublet/oneKey', //一键下单按钮
                    OTHER:{//其他处理按钮
                        PAGE:'/back/rent/sublet/detailSublet/subletReturn/page',//其他处理页面
                        ORGIN_ORDER:'/back/rent/sublet/detailSublet/subletReturn/orginOrder',//查询原始订单
                        RETURN_SAVE:'/back/rent/sublet/detailSublet/subletReturn/returnSave'//其他处理——确认退板
                    },
                    CONFIRM: '/back/rent/sublet/detailSublet/confirm', //确认收货按钮
                    EXPORT: '/back/rent/sublet/detailSublet/export', //导出按钮
                    CONTRACTMANAGEMENT: {
                        PAGE: '/back/rent/sublet/contractManagement/page' , //合同扫描管理
                        PREVIEW: '/back/rent/sublet/contractManagement/preview'  //合同扫描管理
                    }
                },
                CLIENT_CREATE_SUBLET: { // 创建订单转租
                    PAGE: '/back/rent/sublet/clientCreateSublet/page', // 页面
                    LIST: '/back/rent/sublet/clientCreateSublet/list', //获取数据——列表
                    COMPANY: '/back/rent/sublet/clientCreateSublet/company' //获取出货网点

                },
                CLIENT_NEXT_SUBLET: { // 创建订单转租下一步
                    PAGE: '/back/rent/sublet/clientNextSublet/page',//页面
                    SAVE: '/back/rent/Sublet/clientNextSublet/save' //保存
                }
            },
            RETURN: {
                PAGE: 'back/rent/return/page',
                LIST: 'back/rent/return/list',
                DETAIL: {
                    PAGE: '/back/rent/return/detailReturn/page', //详情页面
                    DATA: '/back/rent/return/detailReturn/data', //获取数据
                    GET_COST:'/back/rent/return/detailReturn/getCost',  //费用预估按钮
                    AUDIT: '/back/rent/return/detailReturn/audit', //审核按钮
                    MODIFY: '/back/rent/return/detailReturn/modify', //修改按钮
                    DISCARD: '/back/rent/return/detailReturn/discard', //废弃按钮
                    RECOVERY: '/back/rent/return/detailReturn/recovery', //恢复按钮
                    OneKey: '/back/rent/return/detailReturn/oneKey', //一键下单按钮
                    CONFIRM: '/back/rent/return/detailReturn/confirm', //确认收货按钮
                    EXPORT: '/back/rent/return/detailReturn/export', //导出按钮
                },
                CLIENT_CREATE_RETURN: { // 创建订单退板
                    PAGE: '/back/rent/return/clientCreateReturn/page', //页面
                    LIST: '/back/rent/return/clientCreateReturn/list' //获取数据——列表
                },
                CLIENT_NEXT_RETURN: { // 创建订单退板下一步
                    PAGE: '/back/rent/return/clientNextReturn/page',//页面
                    DATA: '/back/rent/return/clientNextReturn/data', //获取列表数据详情
                    SAVE: '/back/rent/return/clientNextReturn/save' //保存
                }
            },
            INVENTORY: {
                PAGE: '/back/rent/inventory/page',
                LIST: '/back/rent/inventory/list',
                DETAIL: {
                    PAGE: '/back/rent/inventory/detailInventory/page', // 详情页面
                    DATA: '/back/rent/inventory/detailInventory/data', // 获取数据
                    DATA_ALL: '/back/rent/inventory/detailInventory/dataAll' // 获取数据总数
                }
            },
            SCAN_RESULTS:{
                PAGE: '/back/rent/scanResults/page', // 扫描结果查看-页面
                LIST: '/back/rent/scanResults/list', // 扫描结果查看-列表查询
                DETAIL:{ // 扫描结果查看-列表
                    PAGE: 'back/rent/scanResults/detail/page', //扫描明细——列表查询——页面
                    LIST: 'back/rent/scanResults/detail/list', //扫描明细——列表查询
                    UNBIND: 'back/rent/scanResults/detail/unbind', //扫描明细——列表查询——解除绑定按钮
                    BIND: {//扫描明细——列表查询——绑定运单按钮
                        PAGE: 'back/rent/scanResults/bind/page', //扫描明细——列表查询——绑定运单页面
                        LIST: 'back/rent/scanResults/bind/list', //绑定运单——列表查询
                        BIND: 'back/rent/scanResults/bind/bind', //绑定运单——绑定按钮
                    },
                }
            },
        },
        RUN: {
            BUSINESS_CONTROL: {
                PLAN:{//租单计划
                    PAGE: 'back/run/businessControl/rentPlan/page',
                    LIST: 'back/run/businessControl/rentPlan/list',
                    DETAIL: {
                        PAGE: '/back/run/businessControl/rentPlan/detailPlan/page', // 详情页面
                        DATA: '/back/run/businessControl/rentPlan/detailPlan/data', // 获取数据
                        RENTDATA: '/back/run/businessControl/rentPlan/detailPlan/rent', // 获取租金，保证金计算数据

                    },
                },
                CLIENT_CREATE_BUY: { // 创建换购
                    PAGE:
                        'back/run/businessControl/rentBuy/clientCreateBuy/page' // 页面
                },
                DISTRIBUTION:{
                    PAGE:'/back/run/businessControl/distribution/page'
                }
            },
            PATCH_ALLOCATION:{//补板调拨
                PAGE:'/back/run/patchAllocation/page',
                LIST:'/back/run/patchAllocation/list',
                ADD:{
                    PAGE:'/back/run/patchAllocation/createAllocation/page',
                    INPUT:{
                        PAGE:'/back/run/patchAllocation/inputAllocation/page'
                    },
                    RESULT: {
                        PAGE: '/back/run/patchAllocation/resultAllocation/page',
                        DETAIL:{
                            PAGE:'/back/run/patchAllocation/detailResult/page'
                        }
                    },
                    NEXT:{
                        PAGE:  '/back/run/patchAllocation/nextAllocation/page'
                    }
                },
                DETAIL:{//补板调拨详情
                    PAGE:'/back/run/patchAllocation/detailAllocation/page',
                    CONFIRM:{//确认补板调拨
                        PAGE:'/back/run/patchAllocation/confirmAllocation/page'
                    }
                },
            },
            NETWORK: {
                PAGE: '/back/run/networkOperation/page', // 网点作业-页面
                LIST: '/back/run/networkOperation/list', // 网点作业-列表
                RELEASE: { // 作业详情
                    PAGE: '/back/run/networkOperation/network/page', // 页面
                    DATA: '/back/run/networkOperation/network/data', // 获取数据

                }
            },
            PREFERENTIAL_POLICIES: {
                PAGE: '/back/run/preferentialPolicies/page', // 优惠政策-页面
                LIST: '/back/run/preferentialPolicies/list', // 优惠政策-列表
                DETAIL: {// 详情
                    PAGE: '/back/run/preferentialPolicies/detail/page',
                    DATA: '/back/run/preferentialPolicies/detail/data'
                },
                CREATE: { // 新增
                    PAGE: '/back/run/preferentialPolicies/create/page',
                    SAVE: '/back/run/preferentialPolicies/create/save'
                },
                MODIFY: { // 编辑
                    PAGE: '/back/run/preferentialPolicies/modify/page',
                    DATA: '/back/run/preferentialPolicies/modify/data',
                    SAVE: '/back/run/preferentialPolicies/modify/save'
                },
                DELETE: '/back/run/preferentialPolicies/delete' // 删除
            },
            SCAN_RESULTS:{
                PAGE: '/back/run/scanResults/page', // 扫描结果查看-页面
                LIST: '/back/run/scanResults/list', // 扫描结果查看-列表
            },
            HELP_DOCUMENT:{
                PAGE: '/back/run/helpDocument/page', // 帮助文档-页面
                LIST: '/back/run/helpDocument/list', // 帮助文档-列表
                CATEGORY:'/back/run/helpDocument/category',
                DETAIL: {// 详情
                    PAGE: '/back/run/helpDocument/detail/page',
                    DATA: '/back/run/helpDocument/detail/data'
                },
                CREATE: { // 新增
                    PAGE: '/back/run/helpDocument/create/page',
                    SAVE: '/back/run/helpDocument/create/save'
                },
                MODIFY: { // 编辑
                    PAGE: '/back/run/helpDocument/modify/page',
                    DATA: '/back/run/helpDocument/modify/data',
                    SAVE: '/back/run/helpDocument/modify/save'
                },
                DELETE: '/back/run/helpDocument/delete' // 删除
            },
            SYSTEM_LOGS:{
                PAGE: '/back/run/systemLogs/page', // 系统日志-页面
                LIST: '/back/run/systemLogs/list', // 帮助文档-列表
            }
        },
        //供应管理
        SUPPLY: {
            ORDER: {          //生产下单
                PAGE: 'back/supply/order/page',
                LIST: 'back/supply/order/list',
                DETAIL: {//订单详情
                    PAGE: 'back/supply/order/orderinfo/page', // 页面
                    DATA: 'back/supply/order/orderinfo/data',// 获取数据
                    EXPORT:'back/supply/order/orderinfo/export',//订单导出
                    REVIEW:'back/supply/order/orderinfo/review',//审核订单
                    RETURN:'back/supply/order/orderinfo/return',//废弃订单
                    UPDATE:'back/supply/order/orderinfo/update',//审核订单
                    RECOVERY:'back/supply/order/orderinfo/recovery',//恢复订单
                    OFFORDERING:'back/supply/order/orderinfo/offBind',
                    BINDING:{
                        PAGE:'back/supply/order/bindingOrder/page',//详情页面-绑定租赁订单页面
                        LIST:'back/supply/order/bindingOrder/list',//详情页面-绑定租赁订单数据
                        BIND:'back/supply/order/bindingOrder/binding',//详情页面-绑定租赁订单
                    },
                    CONTRACTMANAGEMENT: {
                        PAGE: '/back/supply/order/contractManagement/page' , //详情页面-合同管理页面
                        PREVIEW: '/back/supply/order/contractManagement/preview'  //详情页面-合同管理-预览
                    }
                },
                CREATE_ORDER: {
                    COMPANYDATA: 'back/supply/order/createOrder/company', //客户信息接口
                },
                BIND_PRODUCTION: {//创建新订单-绑定租赁订单
                    PAGE: 'back/supply/order/bindProduction/page', // 页面
                    CREATE_ORDER: { // 创建新订单
                        PAGE: 'back/supply/order/createOrder/page', // 页面
                        COMPANYDATA: 'back/supply/order/createOrder/company', //客户信息接口
                        NEXT_CREATE_ORDER: { // 创建新订单下一步
                            PAGE: 'back/supply/order/nextCreateOrder/page', // 页面 下一步
                            SAVE: 'back/supply/order/nextCreateOrder/save'// 保存数据
                        }
                    }
                }
            },
            CONFIRM: {//订单确认
                PAGE: 'back/supply/confirm/page',
                LIST: 'back/supply/confirm/list',
                DETAIL: {//确认详情
                    PAGE: 'back/supply/confirm/confirminfo/page', // 页面
                    DATA: 'back/supply/confirm/confirminfo/data',// 获取数据
                    ORDER_CONFIRM:'/back/supply/confirm/confirminfo/confirm',//订单确认
                    CONTRACTMANAGEMENT: {
                        PAGE: 'back/supply/confirm/contractManagement/page', // 页面
                        PREVIEW: 'back/supply/confirm/contractManagement/preview' // 页面
                    }

                }
            },
            SETTLEMENT: {//统计结算
                PAGE: 'back/supply/settlement/page',
                LIST: 'back/supply/settlement/list',
                LINE: 'back/supply/settlement/line',
                DET: {//结算详情
                    PAGE: 'back/supply/settlement/settlementinfo/page',
                }
            }
        },
        // 资产管理
        ASSET: {
            // 生命周期
            LIFECYCLE: {
                PAGE: '/back/asset/lifecycle',
                LIST: '/back/asset/lifecycle/list',
                CREATE_PALLET:{
                    PAGE:'/back/asset/lifecycle/add',
                    SAVE:'/back/asset/lifecycle/save',
                },
                DETAIL: { // 账户详情
                    PAGE: '/back/asset/lifecycle/detail/page', // 页面
                    DATA: '/back/asset/lifecycle/detail/data', // 获取数据
                    MAP: { // 地图展示
                        PAGE: '/back/asset/lifecycle/detail/map/page', // 地图页面
                        DATA: '/back/asset/lifecycle/detail/map/data' // 地图-数据
                    },
                    LAST: { //最近一次上报记录
                        PAGE: '/back/asset/lifecycle/detail/last/page', // 最近一次上报记录页面
                        DATA: '/back/asset/lifecycle/detail/last/data' // 最近一次上报记录数据
                    },
                    SINGLE_REPORTED_RECORD: { //单个上报记录
                        PAGE: '/back/asset/lifecycle/detail/single/page', // 单个上报记录页面
                        DATA: '/back/asset/lifecycle/detail/single/data' // 单个上报记录数据
                    },
                    ALL_REPORTED_RECORD: { //所有上报记录
                        PAGE: '/back/asset/lifecycle/detail/all/page', // 所有上报记录页面
                        LIST: '/back/asset/lifecycle/detail/all/list' // 所有上报记录列表
                    }
                }
            },
            // 位置管理
            LOCATION: {
                PAGE: '/back/asset/location',
                LIST: '/back/asset/location/list',
                PRESENT: { // 地图展示
                    PAGE: '/back/asset/location/present/page', // 当前地图页面
                    DATA: '/back/asset/location/present/data' // 地图-数据
                },
                HISTORY: {
                    PAGE: '/back/asset/location/history/page', // 历史地图页面
                    DATA: '/back/asset/location/history/data' // 地图-数据
                },
                DETAIL: { // 账户详情
                    PAGE: '/back/asset/location/detail/page', // 页面
                    DATA: '/back/asset/location/detail/data' // 获取数据
                }
            },
            // 持有管理
            POSSESS: {
                PAGE: '/back/asset/possess',
                LIST: '/back/asset/possess/list',
                DETAIL: { // 账户详情
                    PAGE: '/back/asset/lifecycle/detail/page', // 页面
                    DATA: '/back/asset/lifecycle/detail/data', // 获取数据
                    MAP: { // 地图展示
                        PAGE: '/back/asset/lifecycle/detail/map/page', // 地图页面
                        DATA: '/back/asset/lifecycle/detail/map/data' // 地图-数据
                    }
                }
            }
        },
        // 系统参数
        SYSTEM: {
            MESSAGE: { // 消息参数
                PAGE: '/back/system/message/page',
                LIST: '/back/system/message/list',
                DETAIL: {
                    PAGE: '/back/system/message/detail/page', // 消息参数详情页面
                    DATA: '/back/system/message/detail/data' // 消息参数详情数据
                },
                ENABLED: '/back/system/message/enabled', // 启用参数
                DISABLED: '/back/system/message/disabled' // 禁用参数
            },
            WARN: { // 告警参数
                PAGE: '/back/system/warn/page',
                LIST: '/back/system/warn/list', // 告警参数列表
                DETAIL: { // 告警参数详情
                    PAGE: '/back/system/warn/detail/page', // 页面
                    DATA: '/back/system/warn/detail/data' // 获取数据
                },
                CREATE: { // 新增-告警参数
                    PAGE: '/back/system/warn/create/page', // 页面
                    SAVE: '/back/system/warn/create/save' // 保存修改
                },
                MODIFY: { // 修改告警参数
                    PAGE: '/back/system/warn/modify/page', // 页面
                    DATA: '/back/system/warn/modify/data', // 获取数据
                    SAVE: '/back/system/warn/modify/save' // 保存修改
                },
                DELETE: '/back/system/warn/delete', // 删除告警参数
                ENABLED: '/back/system/warn/enabled', // 启用告警参数
                DISABLED: '/back/system/warn/disabled' // 禁用告警参数
            }
        },
        // 个人中心
        MEMBER: {
            PAGE: '/back/memberCenter',
            SAVE: '/back/memberCenter/save',
            MODIFY: { //修改个人信息
                PAGE: '/back/memberCenter/modify/page', // 页面
                DATA: '/back/memberCenter/modify/data', // 数据-个人信息
                SAVE: '/back/memberCenter/modify/save' // 保存
            },
            UPDATE_PWD: '/back/memberCenter/updatePwd'
        },
        // 登录
        LOGIN: {
            RETRIEVE_PASSWORD: { // 忘记密码
                PAGE: '/login/retrievePassword/page', // 忘记密码页面
                SEND: '/login/retrievePassword/send', // 发送手机验证码
                EMAIL: '/login/retrievePassword/email', // 发送邮箱验证码
                CHECK: '/login/retrievePassword/check', // 校验手机号和验证码是否匹配
                CODE:'/login/retrievePassword/code',//教研邮箱和验证码是否匹配
                REINSTALL: { // 重新设置密码
                    PAGE: '/login/retrievePassword/reinstall/page', // 重新设置密码页面
                    SAVE: '/login/retrievePassword/reinstall/save' // 保存新密码
                }
            }
        },
        //-注册
        REGISTER: {
            PAGE: '/register/page', // 页面
            SEND: '/register/send', // 发送手机验证码
            SAVE: '/register/save' // 保存注册信息
        },
        // 注销
        LOGOUT: {
            PAGE: '/logout/page',
            REQ: '/logout'
        },
        // 咨询客服
        CONSULT: {
            CREATE: {
                SAVE: '/consult/create/save'
            }
        },

        // 单据查询
        BILL: {
            // 详情
            BILL_DETAIL: {
                PAGE: '/back/billDetail/page',
                LIST: '/back/billDetail/list',
                DELETE:'/back/billDetail/delete',
                UPDATE:'/back/billDetail/update',
                ACCEPT:'/back/billDetail/accept',



            },


            // 入库单
            BILL_IN: {
                PAGE: '/back/billIn/page',
                LIST: '/back/billIn/list',
                ADD:{
                    PAGE:'/back/billIn/add',
                    SAVE:'/back/billIn/save',
                },
                DETAIL: { // 入库单详情
                    PAGE: '/back/billIn/detail/page', // 页面
                    DATA: '/back/billIn/detail/data', // 获取数据

                },
                CHECK:'/back/billIn/check',
                OK:'/back/billIn/ok',
                DELETE:'/back/billIn/delete',
                EXPORT:'/back/billIn/export',
                TONGJI:'/back/billIn/tongji',
                ACCEPT:'/back/billIn/accept',


            },
            BILL_OUT    : {
                PAGE: '/back/billOut/page',
                LIST: '/back/billOut/list',
                ADD:{
                    PAGE:'/back/billOut/add',
                    SAVE:'/back/billOut/save',
                },
                DETAIL: { // 入库单详情
                    PAGE: '/back/billOut/detail/page', // 页面
                    DATA: '/back/billOut/detail/data', // 获取数据

                },
                CHECK:'/back/billOut/check',
                OK:'/back/billOut/ok',
                DELETE:'/back/billOut/delete',
                EXPORT:'/back/billOut/export',
                PREPARE:'/back/billOut/prepare',
                COMPLETE:'/back/billOut/complete',

            },
            BILL_REMOVE    : {
                PAGE: '/back/billRemove/page',
                LIST: '/back/billRemove/list',
                ADD:{
                    PAGE:'/back/billRemove/add',
                    SAVE:'/back/billRemove/save',
                },
                DETAIL: { // 入库单详情
                    PAGE: '/back/billRemove/detail/page', // 页面
                    DATA: '/back/billRemove/detail/data', // 获取数据

                },
                CHECK:'/back/billRemove/check',
                OK:'/back/billRemove/ok',
                DELETE:'/back/billRemove/delete',
                EXPORT:'/back/billRemove/export'

            },
            BILL_ALLOT    : {
                PAGE: '/back/billAllot/page',
                LIST: '/back/billAllot/list',
                ADD:{
                    PAGE:'/back/billAllot/add',
                    SAVE:'/back/billAllot/save',
                },
                DETAIL: { // 入库单详情
                    PAGE: '/back/billAllot/detail/page', // 页面
                    DATA: '/back/billAllot/detail/data', // 获取数据

                },
                CHECK:'/back/billAllot/check',
                OK:'/back/billAllot/ok',
                DELETE:'/back/billAllot/delete',
                EXPORT:'/back/billAllot/export'

            },
            BILL_CHECK    : {
                PAGE: '/back/billCheck/page',
                LIST: '/back/billCheck/list',
                ADD:{
                    PAGE:'/back/billCheck/add',
                    SAVE:'/back/billCheck/save',
                },
                DETAIL: { // 入库单详情
                    PAGE: '/back/billCheck/detail/page', // 页面
                    DATA: '/back/billCheck/detail/data', // 获取数据

                },
                TASK:'/back/billCheck/task',


            }

        },

        // 统计报表
        REPORT: {
            // 入库单
            INVENTORY: {
                PAGE: '/back/inventory/page',
                LIST: '/back/inventory/list',
                BATCH:{
                    LIST:'/back/inventory/batch/list',
                },
                WARNING:{
                    LIST:'/back/inventory/warning/list',
                },
                REPORT:{
                    LIST:'/back/inventory/report/list',
                },

                },

            AREA_ITEM:{
                PAGE:'/back/areaItem/page',
                LIST:'/back/areaItem/list',
                UPDATE:'/back/areaItem/update',
            },

            REPORT_DAY:{
                PAGE:'/back/report/dayList/page',
                LIST:'/back/report/dayList/list',

            },
            REPORT_MOON:{
                PAGE:'/back/report/moonList/page',
                LIST:'/back/report/moonList/list',

            },
            REPORT_YEARS:{
                PAGE:'/back/report/yearsList/page',
                LIST:'/back/report/yearsList/list',

            }

        },

        // 基础信息
        BASE: {
            // 货主
            ITEM_MASTER: {
                PAGE: '/back/itemMaster/page',
                LIST: '/back/itemMaster/list',
                ITEM_MASTER_ADD:{

                    SAVE:'/back/itemMaster/save',
                },
                UPDATE:'/back/itemMaster/update',
                DELETE:'/back/itemMaster/delete',

            },

            // 仓库
            WAREHOUSE: {
                PAGE: '/back/warehouse/page',
                LIST: '/back/warehouse/list',
                WAREHOUSE_ADD:{
                    PAGE:'/back/warehouse/add',
                    SAVE:'/back/warehouse/save',
                },
                UPDATE:'/back/warehouse/update',
                DELETE:'/back/warehouse/delete',

            },
            // 货区
            AREA: {
                PAGE: '/back/area/page',
                LIST: '/back/area/list',    //页面使用
                LIST2: '/back/area/list2',   //下拉框使用
                LIST3: '/back/area/list3',   //下拉框使用（获取areaItem列表）
                AREA_ADD:{
                    PAGE:'/back/area/add',
                    SAVE:'/back/area/save',
                },
                WARE:'/back/area/getWare',
                DELETE: '/back/area/delete',
                UPDATE: '/back/area/update',

            },
            // 货架
            SHELF: {
                PAGE: '/back/shelf/page',
                LIST: '/back/shelf/list',
                LIST2: '/back/shelf/list2',
                SHELF_ADD:{
                    PAGE:'/back/shelf/add',
                    SAVE:'/back/shelf/save',
                },
                UPDATE: '/back/shelf/update',
                DELETE: '/back/shelf/delete',



            },
            // 货位
            CELL: {
                PAGE: '/back/cell/page',
                LIST: '/back/cell/list',
                LIST2: '/back/cell/list2',
                UPDATE:'/back/cell/update',
                CELL_ADD:{
                    PAGE:'/back/cell/add',
                    SAVE:'/back/cell/save',
                },
                CELL_ADD_ALL:{
                    PAGE:'/back/cell/addAll',
                    SAVE:'/back/cell/saveAll',
                }

            },
            // 物料
            ITEM: {
                PAGE: '/back/item/page',
                LIST: '/back/item/list',
                LIST2: '/back/item/list2',
                ITEM_ADD:{
                    PAGE:'/back/item/add',
                    SAVE:'/back/item/save',
                },
                UPDATE:'/back/item/update',
                DELETE:'/back/item/delete',
                ITEM_BATCH:{
                    LIST:'/back/item/batch/list',
                },
                BATCH:'/back/item/itemBatch/list'


            },
            // 托盘
            PLLET: {
                PAGE: '/back/pllet/page',
                LIST: '/back/pllet/list',

               PLLET_ADD:{

                    SAVE:'/back/pllet/save',
                },
                UPDATE:'/back/pllet/update',
                DELETE:'/back/pllet/delete',
                BATCH:'/back/pllet/batch'



            },
            // 物料种类
            TYPE: {
                PAGE: '/back/goodsType/page',
                LIST: '/back/goodsType/list',

                TYPE_ADD:{
                    PAGE:'/back/goodsType/add',
                    SAVE:'/back/goodsType/save',
                },
                UPDATE:'/back/goodsType/update',
                DELETE:'/back/goodsType/delete',


            },

       // 单位
            UNIT: {
                PAGE: '/back/unit/page',
                LIST: '/back/unit/list',
                LIST2: '/back/unit/list2',
                UNIT_ADD:{
                    PAGE:'/back/unit/add',
                    SAVE:'/back/unit/save',
                },
                UPDATE:'/back/unit/update',
                DELETE:'/back/unit/delete',


            },


        },
        
        // 设备管理
        DEVICE: {
            // 设备
            INFO: {
                PAGE: '/back/device/info/page',
                LIST: '/back/device/info/list',
                ADD:{
                    
                    SAVE:'/back/device/info/save',
                },
                 
                UPDATE:'/back/device/info/update',
                DELETE:'/back/device/info/delete',
                 

            },
            // 单品
            SINGLE: {
                PAGE: '/back/device/single/page',
                LIST: '/back/device/single/list',
                ADD:{
                    
                    SAVE:'/back/device/single/save',
                },
                 
                UPDATE:'/back/device/single/update',
                DELETE:'/back/device/single/delete',
                 


            },
            // 检查项目
            PROJECT: {
                PAGE: '/back/device/project/page',
                LIST: '/back/device/project/list',
                ADD:{
                    
                    SAVE:'/back/device/project/save',
                },
                DETAIL:{
                    PAGE:'/back/device/project/detail/page',
                },
                UPDATE:'/back/device/project/update',
                DELETE:'/back/device/project/delete',
                 

            },
            // 检查内容
            CONTENT: {
                PAGE: '/back/device/content/page',
                LIST: '/back/device/content/list',
                ADD:{
                    
                    SAVE:'/back/device/content/save',
                },
                 
                UPDATE:'/back/device/content/update',
                DELETE:'/back/device/content/delete',
                 

            },
            // 检查结果
            RESULT: {
                PAGE: '/back/device/result/page',
                LIST: '/back/device/result/list',
                ADD:{
                    
                    SAVE:'/back/device/result/save',
                },
                 
                UPDATE:'/back/device/result/update',
                DELETE:'/back/device/result/delete',
                RESULT:'/back/device/result/result',
                 

            },

            // 检查
            CHECK_MASTER: {
                PAGE: '/back/device/master/page',
                LIST: '/back/device/master/list',
                ADD:{

                    SAVE:'/back/device/master/save',
                },
                DETAIL:{
                    PAGE:'/back/device/master/detail/page',
                },
                UPDATE:'/back/device/master/update',
                DELETE:'/back/device/master/delete',



            },
            // 检查内容
            CHECK_DETAIL: {
                PAGE: '/back/device/detail/page',
                LIST: '/back/device/detail/list',
                ADD:{

                    SAVE:'/back/device/detail/save',
                },

                UPDATE:'/back/device/detail/update',
                DELETE:'/back/device/detail/delete',


            },



        },
        
        
        // 业务操作
        BUSINESS: {
            // 采购
            BUY: {
                PAGE: '/back/buy/page',
                LIST: '/back/buy/list',
                ADD:{
                    PAGE:'/back/buy/add',
                    SAVE:'/back/buy/save',
                },
                DETAIL: { // 入库单详情
                    PAGE: '/back/buy/detail/page', // 页面
                    DATA: '/back/buy/detail/data', // 获取数据

                },
                CHECK:'/back/buy/check',
                OK:'/back/buy/ok',
                DELETE:'/back/buy/delete',
                EXPORT:'/back/buy/export',
                TONGJI:'/back/buy/tongji'

            },
            // 采购退货
            BUY_RETURN: {
                PAGE: '/back/buyReturn/page',
                LIST: '/back/buyReturn/list',    //页面使用

                BUY_RETURN_ADD:{
                    PAGE:'/back/buyReturn/add',
                    SAVE:'/back/buyReturn/save',
                },


            },
            // 销售
            SELL: {
                PAGE: '/back/sell/page',
                LIST: '/back/sell/list',

                SELL_ADD:{
                    PAGE:'/back/sell/billOut/add',
                    SAVE:'/back/sell/save',
                },
               SELL_DETAIL: { // 单详情
                    PAGE: '/back/sell/detail/page', // 页面
                    DATA: '/back/sell/detail/data', // 获取数据

                },
                CHECK:'/back/sell/check',
                OK:'/back/sell/ok',
                DELETE:'/back/sell/delete',
                EXPORT:'/back/sell/export',
                TONGJI:'/back/sell/tongji',
                UPDATE: '/back/sell/update',

            },
            // 销售退货
            SELL_RETURN: {
                PAGE: '/back/sellReturn/page',
                LIST: '/back/sellReturn/list',
                SELL_RETURN_ADD:{
                    PAGE:'/back/sellReturn/add',
                    SAVE:'/back/sellReturn/save',
                },

            },



        },
        // 客户信息
        AGENCY: {
            //
            CLIENT: {
                PAGE: '/back/agency/client/page',
                LIST: '/back/agency/client/list',
                CLIENT_ADD: {
                    PAGE: '/back/agency/client/add',
                    SAVE: '/back/agency/client/save',
                },
                UPDATE: '/back/agency/client/update',
                DELETE: '/back/agency/client/delete',

            },

        // 供应商信息

            //
            SUPPLIER: {
                PAGE: '/back/agency/supplier/page',
                LIST: '/back/agency/supplier/list',
                SUPPLIER_ADD: {
                    PAGE: '/back/agency/supplier/add',
                    SAVE: '/back/agency/supplier/save',
                },
                UPDATE: '/back/agency/supplier/update',
                DELETE: '/back/agency/supplier/delete',

            },
        },
        // 财务管理
        FINANCE: {
            // 财务类别
            TYPE: {
                PAGE: '/back/financeType/page',
                LIST: '/back/financeType/list',
                TYPE_ADD:{
                    PAGE:'/back/financeType/add',
                    SAVE:'/back/financeType/save',
                },
                DELETE:'/back/financeType/delete',
                UPDATE:'/back/financeType/update'

            },
            // 应收
            IN: {
                PAGE: '/back/financeIn/page',
                LIST: '/back/financeIn/list',    //页面使用

                IN_ADD:{
                    PAGE:'/back/financeIn/add',
                    SAVE:'/back/financeIn/save',
                },
                UPDATE: '/back/financeIn/update',
                DELETE: '/back/financeIn/delete',


            },
            // 应付
            OUT: {
                PAGE: '/back/financeOut/page',
                LIST: '/back/financeOut/list',

                OUT_ADD:{
                    PAGE:'/back/financeOut/add',
                    SAVE:'/back/financeOut/save',
                },
                UPDATE: '/back/financeOut/update',
                DELETE: '/back/financeOut/delete',


            },
            // 报表
            REPORT: {
                PAGE: '/back/financeReport/page',
                LIST: '/back/financeReport/list',


            },



        },
        // 作业任务
        TASK: {
            // 货位一栏
            CELL: {
                PAGE: '/back/task/cell/page',
                LIST: '/back/financeType/list',
                TYPE_ADD:{
                    PAGE:'/back/financeType/add',
                    SAVE:'/back/financeType/save',
                },
                DELETE:'/back/financeType/delete'
            },
            // 条码打印
            BAR: {
                PAGE: '/back/task/cell/bar/page',


            },
            // 上架管理
            UP_SHELF: {
                PAGE: '/back/upShelf/page',
                LIST: '/back/upShelf/list',
            },

            // 分拣任务
            PREPARE_TASK: {
                PAGE: '/back/task/prepareTask/page',
                LIST:'/back/task/prepareTask/list',
                ADD:'/back/task/prepareTask/insert',
            },
        },
        // 销售单据查询
        SALEBILL: {

            PAGE: '/back/sell/page',
            LIST: '/back/sell/list',
            ADD:{
                PAGE:'/back/sell/add',
                SAVE:'/back/sell/save',
            },
            DETAIL: { // 入库单详情
                PAGE: '/back/sell/detail/page', // 页面
                DATA: '/back/sell/detail/data', // 获取数据
                SEND:'/back/sell/send',
                INSTALL:'/back/sell/install',
                CHECK:'/back/sell/check',

            }


        },
        // 销售
        SALEDETAIL: {

            PAGE: '/back/detail/page',
            LIST: '/back/detail/list',

            BUY:'/back/detail/buy',

            DETAIL: { // 采购详情
                PAGE: '/back/detail/detail/page', // 页面

            }


        },

    };
    window.URI = URI;
})();

(function () {
    //企业类型：-1=托盘运营商；1=托盘生产商；2=投资商；3=运营代理商；4=托盘承租方；5=POI；
    const COMPANY_TYPE = {
        OPERATOR: -1, // 托盘运营商
        CLIENT: 4, // 客户管理（托盘承租方）
        SUPPLIER: 1, // 供应商（托盘生产商）
        INVESTOR: 2, // 投资商
        AGENT: 3, // 代理商
        POI: 5 // POI 管理
    };
    window.COMPANY_TYPE = COMPANY_TYPE;

    const DEFAULT_IMG = {
        license: 'img/dev/license.png',
        cardFront: 'img/dev/icar_front.png',
        cardContrary: 'img/dev/icar_contrary.png',
        portrait: 'img/portrait.png'
    };
    window.DEFAULT_IMG = DEFAULT_IMG;

    const ACTION = {
        CREATE: 'create',
        MODIFY: 'modify'
    };
    window.ACTION = ACTION;
})();































