import $ from 'jQuery';

(function () {

    let $vue = new Vue({
        el: '.plan-main-hook',
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
            }

        },
        mounted: function () {
            this.$nextTick(() => {
                var $accountBox = $('.plan-hook');
                $accountBox.find('.area-hook').selectpicker({width: '120px'});
                $accountBox.find('.order-status-hook').selectpicker({width: '80px'});
                $accountBox.find('input[name=orderStartTime]').datetimepicker({               //时间插件
                    width: '320px',
                    format: 'Y-m-d',
                    formatDate: 'Y-m-d',
                    scrollMonth: false,
                    scrollTime: false,
                    scrollInput: false,
                    // onShow: function (ct) {
                    //     this.setOptions({
                    //         minDate: '1970/01/01',
                    //         maxDate: new Date()
                    //     });
                    // },
                    // onChangeDateTime: function (dateText, inst) {
                    //     $vue.$data.info.establishDate = new Date(dateText).Format('yyyy-MM-dd');
                    // },
                    timepicker: false // 关闭时间选项
                });
                $accountBox.find('input[name=orderEndTime]').datetimepicker({
                    width: '320px',
                    format: 'Y-m-d',
                    formatDate: 'Y-m-d',
                    scrollMonth: false,
                    scrollTime: false,
                    scrollInput: false,
                    // onShow: function (ct) {
                    //     this.setOptions({
                    //         minDate: '1970/01/01',
                    //         maxDate: new Date()
                    //     });
                    // },
                    timepicker: false // 关闭时间选项
                });
                let tableHookName = '.plan-table-hook';
                //查询
                $accountBox.find('.search-hook').on('click', function () {
                    $(tableHookName).bootstrapTable('onCustomSearch');
                });
                var $form = $accountBox.find('.form-search-hook');
                // 省份-城市-区域
                //初始化，默认不选择任何一个
                var distpicker = {
                    init:function () {
                        $('#distpicker').distpicker();
                    }
                };
                //初始化-省份、城市、区县
                distpicker.init();
                var $tableHook = $accountBox.find(tableHookName).bootstrapTable({
                    scrollbar: 'plan-table-body',
                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端
                    method: 'post',
                    // url: '/back/demo/list',
                    url: URI.RUN.BUSINESS_CONTROL.PLAN.LIST,
                    debug: false,
                    cache: false,
                    pageNumber: 1,
                    pageSize: 20,
                    // fixedColumns: true,
                    customButton: '',
                    customQueryParams: function (params) {
                        var formParams = $form.serializeJson();
                        var queryParams = $.extend({}, params, formParams);
                        return queryParams;
                    },
                    onLoadSuccess: function (data) {
                        console.log(data);
                    },
                    onLoadError: function (status, xhr) {
                    },
                    onCheckAll: function (rows) {

                    },
                    columns: [
                        {
                            field: 'no', title: '序号', align: 'center', width: 50,
                            formatter: function (val, rowData, index) {
                                return index + 1;
                            }
                        },
                        {
                            field: 'orderNo', title: '订单号', align: 'center', fixedLeft: true,width:130,tips:true
                        },
                        {
                            field: 'totalQuantity', title: '托盘总数', align: 'center', fixedLeft: true,width:90
                        },
                        {
                            field: 'leaseMode', title: '租赁方式', align: 'center', fixedLeft: true,width:80,
                            formatter: function (value, row, index) {
                                /* 1平台出租；2代理商出租； */
                                if (value === 1 ){return "平台出租";}
                                else if (value === 2 ){return "代理商出租";}
                            }
                        },
                        {
                            field: 'leaseType', title: '租赁类型', align: 'center', fixedLeft: true,width:80,
                            formatter: function (value, row, index) {
                                /* 1短租；2长租； */
                                if (value === 1 ){return "短租";}
                                else if (value === 2 ){return "长租";}
                            }
                        },
                        {
                            field: ' ', title: '租期', align: 'center', fixedLeft: true,width:80,formatter: function (value, row, index) {
                            return  parseInt((row.leaseEndDate-row.leaseStartDate)/24/60/60/1000);
                        }
                        },
                        {
                            field: 'customerName', title: '承租客户', align: 'center', fixedLeft: true,width:250,tips:3
                        },
                        {
                            field: 'totalRental', title: '租赁租金', align: 'center', fixedLeft: true,width:80,
                        },
                        {
                            field: 'totalDeposit', title: '保证金', align: 'center', fixedLeft: true,width:80
                        },
                        {
                            field: 'customerAddress', title: '目的地', align: 'center', fixedLeft: true,width:250,tips:3
                        },
                        {
                            field: 'placeOrderTime', title: '订单日期', align: 'center', fixedLeft: true,width: 160,
                            formatter: function (value, row, index) {
                                /* 0未确认；1已确认； */
                                return new Date(value).Format('yyyy-MM-dd hh:mm:ss');
                            }
                        },
                        {
                            field: 'operate', title: '操作', align: 'center', fixedLeft: true, width: 80,
                            events: {
                                'click .detail-account': function (e, value,rowData, index) {
                                    M.Page.emit(URI.RUN.BUSINESS_CONTROL.PLAN.DETAIL.PAGE);
                                    IOT.setSessionStore(URI.RUN.BUSINESS_CONTROL.PLAN.DETAIL.PAGE, JSON.stringify(rowData));
                                    return false;
                                }
                            },
                            formatter: function (value, row, index) {
                                return `<a class="detail-account">查看</a>`;
                            }
                        }
                    ]
                });
                if (!M.Authority.checkAuthority('lease-order-plan-detail')) {
                    $(tableHookName).bootstrapTable('hideColumn', 'operate'); // 隐藏列
                }
            });
        }
    });
})();





















