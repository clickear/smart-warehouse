import $ from 'jQuery';
(function () {
    let $vue = new Vue({
        el: '.return-main-hook',
        data: {
            returnType: [{id: 1, name: '到期退板'}, {id: 2, name: '其他原因'}],
            orderStatus: [{id: 0, name: '未审核'}, {id: 1, name: '已审核'}, {id: 2, name: '已完结'}, {id: 3, name: '已废弃'}],
            returnMode: [{id: 1, name: '全部退'}, {id: 2, name: '部分退'}],
            distributionMode: [{id: 1, name: '租方自取'}, {id: 2, name: '承租方配送'}],
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
            // 新增订单续租
            returnOrders: function () {
                M.Page.emit(URI.RENT.RETURN.CLIENT_CREATE_RETURN.PAGE);
            },


        },
        mounted: function () {
            this.$nextTick(() => {
                var $accountBox = $('.return-hook');
                $accountBox.find('.area-hook').selectpicker({width: '120px'});
                $accountBox.find('.order-status-hook').selectpicker({width: '80px'});
                //初始化时间插件
                modal.initDate("startdate","enddate");
                let tableHookName = '.return-table-hook';
                // 查询
                $accountBox.find('.search-hook').on('click', function () {
                    $(tableHookName).bootstrapTable('onCustomSearch');
                });
                $('.search-hook').on('click', function () {
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
                    scrollbar: 'return-table-body',
                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端
                    method: 'post',
                    url: URI.RENT.RETURN.LIST,
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
                    onLoadSuccess: function () {
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
                            field: 'orderNo', title: '退板号', align: 'center', fixedLeft: true, tips:true
                        },
                        {
                            field: 'returnType', title: '退板类型', align: 'center', fixedLeft: true,width:90,
                            formatter: function (value, row, index) {
                                /*退板类型：1到期退板；2其他原因; */
                                if (value === 1 ){return "到期退板";}
                                else if (value === 2 ){return "其他原因";}
                            }
                        },
                        {
                            field: 'returnMode', title: '退板方式', align: 'center', fixedLeft: true,width:90,
                            formatter: function (value, row, index) {
                                if (value === 1 ){return "全部退";}
                                else if (value === 2 ){return "部分退";}
                            }
                        },
                        {
                            field: 'fromOrderNo', title: '订单号', align: 'center', fixedLeft: true, tips:true
                        },
                        {
                            field: 'customerName', title: '承租客户', align: 'center', fixedLeft: true, tips:true
                        },
                        {
                            field: 'totalQuantity', title: '托盘总数', align: 'center', fixedLeft: true,width:80
                        },
                        {
                            field: ' ', title: '租期', align: 'center', fixedLeft: true,width:80,formatter: function (value, row, index) {
                            return  Math.ceil((parseInt((row.leaseEndDate-row.leaseStartDate)/24/60/60/1000)/31))+'月'
                           }
                        },
                        {
                            field: 'totalDeposit', title: '保证金', align: 'center', fixedLeft: true,width:80
                        },
                        {
                            field: 'totalDeposit', title: '退保证金', align: 'center', fixedLeft: true,width:80
                        },
                        {
                            field: 'orderStatusValue', title: '订单状态', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'distributionMode', title: '配送方式', align: 'center', fixedLeft: true,width:100,
                            formatter: function (value, row, index) {
                                if (value == 1 ){return "租方自取";}
                                else if (value == 2 ){return "承租方配送";}
                            }
                        },
                        {
                            field: 'pickupAddress', title: '目的地', align: 'center', fixedLeft: true,tips:true
                        },
                        {
                            field: 'confirmTime', title: '退板日期', align: 'center', fixedLeft: true,
                            formatter: function (value, row, index) {
                                if ((!value)&&(value!=0)){
                                    return '-';
                                }else{
                                    return new Date(value).Format('yyyy-MM-dd hh:mm:ss');
                                }
                            }
                        },
                        {
                            field: 'operate', title: '操作', align: 'center', fixedLeft: true,width:60,
                            events: {
                                'click .detail-return': function (e, value, rowData, index) {
                                    M.Page.emit(URI.RENT.RETURN.DETAIL.PAGE);
                                    IOT.setSessionStore(URI.RENT.RETURN.DETAIL.PAGE, JSON.stringify(rowData));
                                    return false;
                                }
                            },
                            formatter: function (value, row, index) {
                                return `<a class="detail-return">查看</a>`;
                            }
                        }
                    ]
                });
                //权限——查看
                if (!M.Authority.checkAuthority('unsubscribe-detail')) {
                    $(tableHookName).bootstrapTable('hideColumn', 'operate');//隐藏列
                }
            });
        }
    });
})();