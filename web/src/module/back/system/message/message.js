import $ from 'jQuery';
import URI from 'URI';

$(function () {
    var _enabled = function (params) {
        IOT.confirm('你确定要启用', () => {
            IOT.showOverlay('保存中，请稍等...');
            IOT.getServerData(URI.SYSTEM.MESSAGE.ENABLED, {id: params.paramId}, function (ret) {
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

    var _disabled = function (params) {
        IOT.confirm('你确定要停用', () => {
            IOT.showOverlay('保存中，请稍等...');
            IOT.getServerData(URI.SYSTEM.MESSAGE.DISABLED, {id: params.paramId}, function (ret) {
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
            // 上一页
            prePage: function () {
                M.Page.prePage(this.boxs);
            },
            // 触发刷新页(当前显示的页面)
            refreshPage: function () {
                M.Page.refreshPage(this.boxs);
            },
            // 新增账户
            addAccount: function () {
                M.Page.emit(URI.ORGANIZATION.ACCOUNT.CLIENT_CREATE_ACCOUNT.PAGE);
            }
        },
        mounted: function () {
            this.$nextTick(() => {
                var $defaultHook = $('.default-hook');
                $defaultHook.find('.area-hook').selectpicker({width: '90px'});
                $defaultHook.find('.order-status-hook').selectpicker({width: '110px'});
                let tableHookName = '.message-table-hook';
                var $form = $defaultHook.find('.search-hook');
                var $tableHook = $defaultHook.find(tableHookName).bootstrapTable({
                    scrollbar: 'message-table-body',
                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端
                    method: 'post',
                    url: URI.SYSTEM.MESSAGE.LIST,
                    debug: false,
                    cache: false,
                    pageNumber: 1,
                    pageSize: 20,
                    // fixedColumns: true,
                    authority: M.Authority.checkAuthority('message-param-query'),
                    customButton: '',
                    customQueryParams: function (params) {
                        var formParams = $form.serializeJson();
                        var queryParams = $.extend({}, params, formParams);
                        return queryParams;
                    },
                    onLoadSuccess: function () {
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
                            field: 'state', title: '参数状态', align: 'center', fixedLeft: true,
                            formatter: function (value, row, index) {
                                return value === 'normal' ? '启用' : '停用';
                            }
                        },

                        {
                            field: 'operate', title: '操作', align: 'center', fixedLeft: true, width: 100,
                            events: {
                                'click .detail': function (e, value, row, index) {
                                    M.Page.emit(URI.SYSTEM.MESSAGE.DETAIL.PAGE);
                                    IOT.setSessionStore(URI.SYSTEM.MESSAGE.DETAIL.PAGE, row.paramId);
                                    return false;
                                },
                                'click .enabled': function (e, value, row, index) {
                                    _enabled(row);
                                    return false;
                                },
                                'click .disabled': function (e, value, row, index) {
                                    _disabled(row);
                                    return false;
                                }
                            },
                            formatter: function (value, row, index) {
                                let html = [];
                                if (M.Authority.checkAuthority('message-param-detail')) {
                                    html.push('<a class="detail operate">查看</a>');
                                }
                                if (row.state === 'normal') {
                                    if (M.Authority.checkAuthority('message-param-disable')) {
                                        html.push('<a class="disabled operate">停用</a>');
                                    }
                                } else {
                                    if (M.Authority.checkAuthority('message-param-enable')) {
                                        html.push('<a class="enabled operate">启用</a>');
                                    }
                                }
                                return html.join('');
                            }
                        }
                    ]
                });
                // 查看
                if (!M.Authority.checkAuthority('message-param-detail') && !M.Authority.checkAuthority('message-param-disable')&& !M.Authority.checkAuthority('message-param-enable')) {
                    $(tableHookName).bootstrapTable('hideColumn', 'operate'); // 隐藏列
                }
            });
        }
    });
});

