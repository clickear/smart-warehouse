import $ from 'jQuery';
import URI from 'URI';
$(function () {
    let $vue = new Vue({
        el: '.main-hook',
        data: {
            durationType: [{id: 1, name: '库存'}, {id: 2, name: '已租'}, {id: 3, name: '已售'}],
            lifecycleType: [{name: '全部'}, {name: '超期'}, {name: '正常'}],
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
            newPallet:function(){        //新增托盘
                M.Page.emit(URI.ASSET.LIFECYCLE.CREATE_PALLET.PAGE);
            },
            // 新增账户
            addAccount: function () {
                M.Page.emit(URI.ORGANIZATION.ACCOUNT.CLIENT_CREATE_ACCOUNT.PAGE);
            },
            searchTable: function () {
                $('.lifecycle-table-hook').bootstrapTable('onCustomSearch');
            }
        },
        mounted: function () {
            this.$nextTick(() => {
                var $defaultHook = $('.default-hook');
                // 初始化时间控件
                $defaultHook.find('input[name=activateStartTime]').datetimepicker({
                    width: '320px',
                    format: 'Y-m-d',
                    formatDate: 'Y-m-d',
                    scrollMonth: false,
                    scrollTime: false,
                    scrollInput: false,
                    onShow: function (ct) {
                        this.setOptions({
                            minDate: '1970/01/01',
                            maxDate: new Date()
                        });
                    },
                    // onChangeDateTime: function (dateText, inst) {
                    //     $vue.$data.info.establishDate = new Date(dateText).Format('yyyy-MM-dd');
                    // },
                    timepicker: false // 关闭时间选项
                });
                $defaultHook.find('input[name=activateEndTime]').datetimepicker({
                    width: '320px',
                    format: 'Y-m-d',
                    formatDate: 'Y-m-d',
                    scrollMonth: false,
                    scrollTime: false,
                    scrollInput: false,
                    onShow: function (ct) {
                        this.setOptions({
                            minDate: '1970/01/01',
                            maxDate: new Date()
                        });
                    },
                    timepicker: false // 关闭时间选项
                });
                let tableHookName = '.lifecycle-table-hook';
                let $form = $defaultHook.find('.form-hook');
                // 省市区
                $defaultHook.find('.distpicker-hook').distpicker();
                // 查询
                $form.on('submit', function () {
                    $(tableHookName).bootstrapTable('onCustomSearch');
                    return false;
                });
                var $tableHook = $defaultHook.find(tableHookName).bootstrapTable({
                    scrollbar: 'lifecycle-table-body',
                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端
                    method: 'post',
                    url: URI.ASSET.LIFECYCLE.LIST,
                    debug: false,
                    cache: false,
                    pageNumber: 1,
                    pageSize: 20,
                    // fixedColumns: true,
                    authority: M.Authority.checkAuthority('lifecycle-query'),
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
                            field: 'num', title: '序号', align: 'center', fixedLeft: true,width: 50,
                            formatter: function (value, row, index) {
                                return index + 1;
                            }
                        },
                        {
                            field: 'deviceId', title: '托盘ID', align: 'center', fixedLeft: true, width: 100,
                        },{
                            field: 'palletId', title: 'ID', align: 'center', fixedLeft: true, width: 70,
                        },
                        {
                            field: 'durationType', title: '存续类型', align: 'center', fixedLeft: true, width: 85,
                        },
                        {
                            field: 'company', title: '业主单位', align: 'center', fixedLeft: true, tips: true
                        },
                        {
                            field: 'address', title: '业主地址', align: 'center', fixedLeft: true,width: 100, tips: 'field'
                        },
                        {
                            field: 'phone', title: '业主单位电话', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'lifeCycleDesign', title: '设计生命周期（年）', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'lifeCycleRemaining', title: '剩余生命周期（年）', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'activateTime', title: '激活时间', align: 'center', fixedLeft: true,
                            formatter: function (val, row, index) {
                                return `${val}`;
                            }
                        },
                        {
                            field: 'operate', title: '操作', align: 'center', fixedLeft: true, width: 100,
                            events: {
                                'click .custom-edit': function (e, value, row, index) {
                                    M.Page.emit(URI.ASSET.LIFECYCLE.DETAIL.MAP.PAGE, {deviceId: row.deviceId});
                                    IOT.setSessionStore(URI.ASSET.LIFECYCLE.DETAIL.MAP.PAGE, row.deviceId);
                                    return false;
                                }
                            },
                            formatter: function (value, row, index) {
                                return '<a class="custom-edit">查看</a>';
                            }
                        }
                    ]
                });
                // 查看
                if (!M.Authority.checkAuthority('lifecycle-detail')) {
                    $(tableHookName).bootstrapTable('hideColumn', 'operate'); // 隐藏列
                }
            });
        }
    });
});
