import $ from 'jQuery';

(function () {
    /**
     * 删除账户
     * @param params
     * @private
     */
    var _deleteAccount = function (params) {
        IOT.confirm('你确定要删除吗？', () => {
            IOT.showOverlay('保存中，请稍等...');
            IOT.getServerData(URI.ORGANIZATION.ACCOUNT.DELETE, params, function (ret) {
                IOT.hideOverlay();
                if (ret && ret.code === 200) {
                    IOT.tips('删除成功！', 'success');
                    M.Table.refresh.all();
                    BootstrapDialog.closeAll();
                } else {
                    IOT.tips(ret.msg || '操作失败，请重试！', 'error');
                }
            });
            return false;
        }, null, 'warn');
    };

    /**
     * 启用账户
     * @param params
     * @private
     */
    var _enabledAccount = function (params) {
        IOT.confirm('你确定要启用账户', () => {
            IOT.showOverlay('保存中，请稍等...');
            IOT.getServerData(URI.ORGANIZATION.ACCOUNT.ENABLED, params, function (ret) {
                IOT.hideOverlay();
                if (ret && ret.code === 200) {
                    IOT.tips('启用账户成功！', 'success');
                    M.Table.refresh.all();
                    BootstrapDialog.closeAll();
                } else {
                    IOT.tips(ret.msg || '操作失败，请重试！', 'error');
                }
            });
            return false;
        }, null, 'warn');
    };

    /**
     * 禁用账户
     * @param params
     * @private
     */
    var _disabledAccount = function (params) {
        IOT.confirm('你确定要停用账户', () => {
            IOT.showOverlay('保存中，请稍等...');
            IOT.getServerData(URI.ORGANIZATION.ACCOUNT.DISABLED, params, function (ret) {
                IOT.hideOverlay();
                M.Table.refresh.all();
                if (ret && ret.code === 200) {
                    IOT.tips('停用账户成功！', 'success');
                    BootstrapDialog.closeAll();
                } else {
                    IOT.tips(ret.msg || '操作失败，请重试！', 'error');
                }
            });
            return false;
        }, null, 'warn');
    };

    let $accountBox = null;
    let $vue = new Vue({
        el: '.main-hook',
        data: {
            boxs: {
                box1: {show: true, hook: '.box1-hook', lock: true, url: '/back/organization/account/page', params: {}},
                box2: {show: false, hook: '.box2-hook', url: '', params: {}},
                box3: {show: false, hook: '.box3-hook', url: '', params: {}},
                box4: {show: false, hook: '.box4-hook', url: '', params: {}}
            },
            roleList: []
        },
        created: function () {
            M.Request.getRoleList(true, (roleList, ret) => {
                this.roleList = roleList;
            });
        },
        methods: {
            emitPage: function () {
                M.Page.load(this.boxs);
            },
            // 上一页
            prePage: function () {
                M.Page.prePage(this.boxs);
            },
            // 触发刷新页(当前显示的页面)
            refreshPage: function () {
                M.Page.refreshPage(this.boxs);
            },
            // 新增账户
            addAccount: function (companyType) {
                if (companyType === '-1') {
                    M.Page.emit(URI.ORGANIZATION.ACCOUNT.PLATFORM_CREATE_ACCOUNT.PAGE);
                } else {
                    M.Page.emit(URI.ORGANIZATION.ACCOUNT.CLIENT_CREATE_ACCOUNT.PAGE);
                }
            }
        },
        mounted: function () {
            let thiz = this;
            this.$nextTick(() => {
                let tableHookName = '.account-table-hook';
                $accountBox = $('.account-hook');
                var $form = $accountBox.find('.form-hook');
                // 查询
                $form.off('submit').on('submit', function () {
                    $(tableHookName).bootstrapTable('onCustomSearch');
                    return false;
                });
                var $tableHook = $accountBox.find(tableHookName).bootstrapTable({
                    scrollbar: 'account-table-body',
                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端
                    method: 'post',
                    url: URI.ORGANIZATION.ACCOUNT.LIST,
                    debug: false,
                    cache: false,
                    pageNumber: 1,
                    pageSize: 20,
                    // fixedColumns: true,
                    customButton: '',
                    customQueryParams: function (params) {
                        var formParams = $form.serializeJson();
                        var queryParams = $.extend({}, params, formParams);
                        // console.log(queryParams);
                        return queryParams;
                    },
                    onLoadSuccess: function (data) {
                        // console.log(JSON.stringify(data));
                    },
                    onLoadError: function (status, xhr) {
                    },
                    onCheckAll: function (rows) {

                    },
                    columns: [
                        // {
                        //     field: '', checkbox: true, align: 'center', fixedLeft: true, width: 60,
                        //     events: {
                        //         'change .checkbox-hook': function (e, value, row, index) {
                        //             console.log('复选框: ' + value);
                        //         }
                        //     }
                        // },
                        {
                            field: 'no', title: '序号', align: 'center', width: 50,
                            formatter: function (val, rowData, index) {
                                return index + 1;
                            }
                        },
                        {
                            field: 'mobile', title: '手机号码', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'userName', title: '用户姓名', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'gender', title: '性别', align: 'center', fixedLeft: true,
                            formatter: function (val, rowData, index) {
                                return val === 0 ? '男' : '女';
                            }
                        },
                        {
                            field: 'email', title: '电子邮箱', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'roleName', title: '用户角色', align: 'center', fixedLeft: true,
                            formatter: function (val, row, index) {
                                return `${val}`;
                            }
                        },
                        {
                            field: 'accountStatus', title: '状态', align: 'center',
                            formatter: function (val, rowData, index) {
                                return val === 'enable' ? '启用' : '停用';
                            }
                        },
                        {
                            field: 'companyName', title: '所属单位', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'registerTime', title: '注册时间', align: 'center', fixedLeft: true,
                            formatter: function (val, row, index) {
                                return val;
                            }
                        },
                        {
                            field: 'operate', title: '操作', align: 'left', fixedLeft: true, width: 180,
                            events: {
                                'click .detail-account': function (e, value, rowData, index) {
                                    M.Page.emit(URI.ORGANIZATION.ACCOUNT.DETAIL.PAGE);
                                    IOT.setSessionStore(URI.ORGANIZATION.ACCOUNT.DETAIL.PAGE, JSON.stringify(rowData));
                                    return false;
                                },
                                'click .modify-account': function (e, value, rowData, index) {
                                    M.Page.emit(URI.ORGANIZATION.ACCOUNT.MODIFY.PAGE);
                                    IOT.setSessionStore(URI.ORGANIZATION.ACCOUNT.MODIFY.PAGE, JSON.stringify(rowData));
                                    return false;
                                },
                                'click .delete-account': function (e, value, row, index) {
                                    _deleteAccount(row);
                                    return false;
                                },
                                'click .enabled-account': function (e, value, row, index) {
                                    _enabledAccount(row);
                                    return false;
                                },
                                'click .disabled-account': function (e, value, row, index) {
                                    _disabledAccount(row);
                                    return false;
                                }
                            },
                            formatter: function (value, row, index) {
                                let html = [];
                                if (M.Authority.checkAuthority('account-detail')) {
                                    html.push('<a class="detail-account operate">查看</a>');
                                }
                                html.push('<a class="modify-account operate">修改</a>');
                                if (!row.admin) {
                                    html.push('<a class="delete-account operate">删除</a>');
                                    // enable=启用，disable=停用
                                    if (row.accountStatus === 'enable') {
                                        html.push('<a class="disabled-account operate">停用</a>');
                                    } else {
                                        html.push('<a class="enabled-account operate">启用</a>');
                                    }
                                }
                                return html.join('');
                            }
                        }
                    ]
                });
            });
        }
    });
})();





















