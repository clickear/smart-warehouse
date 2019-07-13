import $ from 'jQuery';
import URI from 'URI';

$(function () {
    /**
     * 删除告警
     * @param params
     * @private
     */
    var _deleteWarn = function (params) {
        IOT.confirm('你确定要删除吗？', () => {
            IOT.showOverlay('保存中，请稍等...');
            IOT.getServerData(URI.SYSTEM.WARN.DELETE, {id: params.paramId}, function (ret) {
                IOT.hideOverlay();
                if (ret && ret.code === 200) {
                    M.Table.refresh.all();
                    BootstrapDialog.closeAll();
                    IOT.tips('删除成功！', 'success');
                } else {
                    IOT.tips(ret.msg || '操作失败，请重试！', 'error');
                }
            });
            return false;
        }, null, 'warn');
    };

    /**
     * 启用告警参数
     * @param params
     * @private
     */
    var _enabledWarn = function (params) {
        IOT.confirm('你确定要启用', () => {
            IOT.showOverlay('保存中，请稍等...');
            IOT.getServerData(URI.SYSTEM.WARN.ENABLED, {id: params.paramId}, function (ret) {
                IOT.hideOverlay();
                if (ret && ret.code === 200) {
                    IOT.tips('启用成功！', 'success');
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
     * 禁用告警参数
     * @param params
     * @private
     */
    var _disabledWarn = function (params) {
        IOT.confirm('你确定要停用', () => {
            IOT.showOverlay('保存中，请稍等...');
            IOT.getServerData(URI.SYSTEM.WARN.DISABLED, {id: params.paramId}, function (ret) {
                IOT.hideOverlay();
                if (ret && ret.code === 200) {
                    IOT.tips('停用成功！', 'success');
                    M.Table.refresh.all();
                    BootstrapDialog.closeAll();
                } else {
                    IOT.tips(ret.msg || '操作失败，请重试！', 'error');
                }
            });
            return false;
        }, null, 'warn');
    };


    let $vue = new Vue({
        el: '.main-hook',
        data: {
            boxs: {
                box1: {show: true, hook: '.box1-hook', lock: true, url: '', params: {}},
                box2: {show: false, hook: '.box2-hook', url: '', params: {}},
                box3: {show: false, hook: '.box3-hook', url: '', params: {}},
                box4: {show: false, hook: '.box4-hook', url: '', params: {}}
            }
        },
        methods: {
            emitPage: function () {
                M.Page.load(this.boxs);
            },
            prePage: function () {
                M.Page.prePage(this.boxs);
            },
            refreshPage: function () {
                M.Page.refreshPage(this.boxs);
            },
            add: function () {
                M.Page.emit(URI.SYSTEM.WARN.CREATE.PAGE);
                IOT.setSessionStore(URI.SYSTEM.WARN.CREATE.PAGE, JSON.stringify({action: ACTION.CREATE}));
            }
        },
        mounted: function () {
            this.$nextTick(() => {
                let tableHookName = '.warn-table-hook';
                var $defaultHook = $('.default-hook');
                var $form = $defaultHook.find('.search-hook');
                $form.find('.query-hook').on('click', function () {
                    $(tableHookName).bootstrapTable('onCustomSearch');
                });
                var $tableHook = $defaultHook.find(tableHookName).bootstrapTable({
                    scrollbar: 'warn-table-body',
                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端
                    method: 'post',
                    url: URI.SYSTEM.WARN.LIST,
                    // debug: true,
                    cache: false,
                    pageNumber: 1,
                    pageSize: 20,
                    // fixedColumns: true,
                    authority: M.Authority.checkAuthority('alarm-param-query'),
                    customButton: '',
                    customQueryParams: function (params) {
                        var formParams = $form.serializeJson();
                        var queryParams = $.extend({}, params, formParams);
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
                        {
                            field: 'num', title: '序号', align: 'center', width: 50,
                            formatter: function (value, row, index) {
                                return index + 1;
                            }
                        },
                        {
                            field: 'paramName', title: '参数名称', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'paramDescribe', title: '参数描述', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'state', title: '参数状态', align: 'center',
                            formatter: function (val, row, index) {
                                return val === 'normal' ? '启用' : '停用';
                            }
                        },
                        {
                            field: 'createUserName', title: '创建人', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'createTime', title: '创建时间', align: 'center', fixedLeft: true
                        },

                        {
                            field: 'operate', title: '操作', align: 'center', fixedLeft: true, width: 220,
                            events: {
                                'click .detail': function (e, value, rowData, index) {
                                    M.Page.emit(URI.SYSTEM.WARN.DETAIL.PAGE);
                                    IOT.setSessionStore(URI.SYSTEM.WARN.DETAIL.PAGE, rowData.paramId);
                                    return false;
                                },
                                'click .modify': function (e, value, rowData, index) {
                                    M.Page.emit(URI.SYSTEM.WARN.MODIFY.PAGE);
                                    IOT.setSessionStore(URI.SYSTEM.WARN.CREATE.PAGE, JSON.stringify({
                                        action: ACTION.MODIFY,
                                        id: rowData.paramId
                                    }));
                                    return false;
                                },
                                'click .delete': function (e, value, row, index) {
                                    _deleteWarn(row);
                                    return false;
                                },
                                'click .enabled': function (e, value, row, index) {
                                    _enabledWarn(row);
                                    return false;
                                },
                                'click .disabled': function (e, value, row, index) {
                                    _disabledWarn(row);
                                    return false;
                                }
                            },
                            formatter: function (value, row, index) {
                                let html = [];
                                if (M.Authority.checkAuthority('alarm-param-detail')) {
                                    html.push('<a class="detail operate">查看</a>');
                                }
                                if (M.Authority.checkAuthority('alarm-param-modify')) {
                                    html.push('<a class="modify operate">编辑</a>');
                                }
                                if (row.state === 'normal') {
                                    if (M.Authority.checkAuthority('alarm-param-disable')) {
                                        html.push('<a class="disabled operate">停用</a>');
                                    }
                                } else {
                                    if (M.Authority.checkAuthority('alarm-param-enable')) {
                                        html.push('<a class="enabled operate">启用</a>');
                                    }
                                }
                                if (M.Authority.checkAuthority('alarm-param-deleted')) {
                                    html.push('<a class="delete operate">删除</a>');
                                }
                                return html.join('');
                            }
                        }
                    ]
                });
                // 查看
                if (!M.Authority.checkAuthority('alarm-param-detail')
                    && !M.Authority.checkAuthority('alarm-param-disable')
                    && !M.Authority.checkAuthority('alarm-param-enable')
                    && !M.Authority.checkAuthority('alarm-param-deleted')
                    && !M.Authority.checkAuthority('alarm-param-modify')) {
                    $(tableHookName).bootstrapTable('hideColumn', 'operate'); // 隐藏列
                }
            });
        }
    });
});

