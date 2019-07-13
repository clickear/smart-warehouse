import $ from 'jQuery';
(function () {
    let $vue = new Vue({
        el: '.relet-main-hook',
        data: {
            orderStatus: [{id: 0, name: '未审核'}, {id: 1, name: '已审核'}, {id: 2, name: '已完结'}, {id: 3, name: '已废弃'}],
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
            renewOrders: function () {
                M.Page.emit(URI.RENT.RELET.CLIENT_CREATE_RELET.PAGE);
            }
        },
        mounted: function () {
            this.$nextTick(() => {
                var $accountBox = $('.relet-hook');
                $accountBox.find('.area-hook').selectpicker({width: '120px'});
                $accountBox.find('.order-status-hook').selectpicker({width: '80px'});
                //初始化时间插件
                modal.initDate("startdate","enddate");
                let tableHookName = '.relet-table-hook';
                // 省份-城市-区域
                //初始化，默认不选择任何一个
                var distpicker = {
                    init:function () {
                        $('#distpicker').distpicker();
                    }
                };
                //初始化-省份、城市、区县
                distpicker.init();
                // 查询
                $accountBox.find('.search-hook').on('click', function () {
                    $(tableHookName).bootstrapTable('onCustomSearch');
                });
                var $form = $accountBox.find('.form-search-hook');
                var $tableHook = $accountBox.find(tableHookName).bootstrapTable({
                    scrollbar: 'relet-table-body',
                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端
                    method: 'post',
                    url: URI.RENT.RELET.LIST,
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
                            field: 'orderNo', title: '订单号', align: 'center', fixedLeft: true,tips: true,
                        },
                        {
                            field: 'totalQuantity', title: '托盘总数', align: 'center', fixedLeft: true,width:100
                        },
                        {
                            field: 'leaseMode', title: '租赁方式', align: 'center', fixedLeft: true,width:100,
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
                            return  Math.ceil((parseInt((row.leaseEndDate-row.leaseStartDate)/24/60/60/1000)/31))+'月'
                        }
                        },
                        {
                            field: 'orderStatusValue', title: '订单状态', align: 'center', fixedLeft: true,tips: true,
                            /* formatter:function(value,row,index){
                             if (value == 0 ){return "未审核";}
                             else if (value == 1 ){return "已审核";}
                             else if (value == 2 ){return "已完结";}
                             else if (value == 3 ){return "已废弃";}
                             }*/
                        },
                        {
                            field: 'customerName', title: '承租客户', align: 'center', fixedLeft: true,tips: true,
                        },
                        {
                            field: 'orderNo', title: '租赁订单号', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'totalRental', title: '租赁租金', align: 'center',fixedLeft: true,width:100
                        },
                        {
                            field: 'customerAddress', title: '目的地', align: 'center',tips: true, fixedLeft: true,width: 150
                        },
                        {
                            field: 'placeOrderTime', title: '订单日期', align: 'center',fixedLeft: true,width: 155,
                            formatter: function (value, row, index) {
                                /* 0未确认；1已确认； */
                                return new Date(value).Format('yyyy-MM-dd hh:mm:ss');
                            }
                        },
                        {
                            field: 'operate', title: '操作', align: 'center', fixedLeft: true, width: 80,
                            events: {
                                'click .detail-account': function (e, value, rowData, index) {
                                    M.Page.emit(URI.RENT.RELET.DETAIL.PAGE);
                                    IOT.setSessionStore(URI.RENT.RELET.DETAIL.PAGE, JSON.stringify(rowData));
                                    return false;
                                }
                            },
                            formatter: function (value, row, index) {
                                return `<a class="detail-account">查看</a>`;

                            }
                        }
                    ]
                });
                // 查看
                if (!M.Authority.checkAuthority('pallet-continue-lease-detail')) {
                    $(tableHookName).bootstrapTable('hideColumn', 'operate'); // 隐藏列
                }
            });
        }
    });
})();





















