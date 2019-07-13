import $ from 'jQuery';
import URI from 'URI';

$(function () {
    let $vue = new Vue({
        el: '.main-hook',
        data: {
            possessType: [
                {id: 1, name: '全部'},
                {id: 2, name: '托盘承租方'},
                {id: 3, name: '运营代理商'},
                {id: 4, name: '投资商'}],
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
                let tableHookName = '.possess-table-hook';
                var $form = $defaultHook.find('.form-hook');
                // 省市区
                $defaultHook.find('.distpicker-hook').distpicker();
                // 查询
                $form.on('submit', function () {
                    $(tableHookName).bootstrapTable('onCustomSearch');
                    return false;
                });
                var $tableHook = $defaultHook.find(tableHookName).bootstrapTable({
                    // el: tableHookName,
                    // scrollbar: 'demo-table-body',
                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端
                    method: 'post',
                    url: URI.ASSET.POSSESS.LIST,
                    debug: false,
                    cache: false,
                    pageNumber: 1,
                    pageSize: 20,
                    // fixedColumns: true,
                    authority: M.Authority.checkAuthority('hold-query'),
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
                            field: 'num', title: '序号', align: 'center', fixedLeft: true,
                            formatter: function (value, row, index) {
                                return index + 1;
                            }
                        },
                        {
                            field: 'company', title: '业主单位', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'durationType', title: '持有单位类型', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'address', title: '业主地址', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'phone', title: '业主单位电话', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'datetime', title: '托盘总计', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'phone', title: '在途', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'phone', title: '库存', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'operate', title: '详情', align: 'center', fixedLeft: true, width: 100,
                            events: {
                                'click .custom-edit': function (e, value, row, index) {
                                    M.Page.emit(URI.ASSET.POSSESS.DETAIL.PAGE, {deviceId: row.deviceId});
                                    return false;
                                }
                            },
                            formatter: function (value, row, index) {
                                return '<a class="custom-edit">编辑</a>';
                            }
                        }
                    ]
                });
                // 查看
                if (!M.Authority.checkAuthority('hold-detail')) {
                    $(tableHookName).bootstrapTable('hideColumn', 'operate'); // 隐藏列
                }
            });
        }
    });
});

