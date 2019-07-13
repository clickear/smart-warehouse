import $ from 'jQuery';
(function () {
    let $vue = new Vue({
        el: '.sublet-main-hook',
        data: {
            leaseType: [{id: 1, name: '短租'}, {id: 2, name: '长租'}],
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
            // 新增托盘转租
            subletOrders: function () {
                M.Page.emit(URI.RENT.SUBLET.CLIENT_CREATE_SUBLET.PAGE);
            }
        },
        mounted: function () {
            this.$nextTick(() => {
                var $accountBox = $('.sublet-hook');
                //初始化时间插件
                modal.initDate("startdate","enddate");
                let tableHookName = '.sublet-table-hook';
                // 查询
                $accountBox.find('.search-hook').on('click', function () {
                    $(tableHookName).bootstrapTable('onCustomSearch');
                });
                // 省份-城市-区域
                //初始化，默认不选择任何一个
                var distpicker = {
                    init:function () {
                        $('#distpicker').distpicker();
                    }
                };
                //初始化-省份、城市、区县
                distpicker.init();
                var $form = $accountBox.find('.form-search-hook');
                var $tableHook = $accountBox.find(tableHookName).bootstrapTable({
                    scrollbar: 'sublet-table-body',
                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端
                    method: 'post',
                    url: URI.RENT.SUBLET.LIST,
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
                            field: 'orderNo', title: '订单号', align: 'center', fixedLeft: true, tips:true
                        },
                        {
                            field: 'totalQuantity', title: '托盘总数', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'leaseType', title: '租赁类型', align: 'center', fixedLeft: true,width:80,
                            formatter: function (value, row, index) {
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
                            field: 'orderStatusValue', title: '订单状态', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'customerName', title: '承租客户', align: 'center', fixedLeft: true, tips:true
                        },
                        {
                            field: 'totalRental', title: '租赁租金', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'totalDeposit', title: '保证金', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'pickupAddress', title: '目的地', align: 'center', fixedLeft: true, tips:true
                        },
                        {
                            field: 'placeOrderTime', title: '订单日期', align: 'center', fixedLeft: true,
                            formatter: function (value, row, index) {
                                if ((!value)&&(value!=0)){
                                    return '-';
                                }else{
                                    return new Date(value).Format('yyyy-MM-dd hh:mm:ss');
                                }
                            }
                        },
                        {
                            field: 'operate', title: '操作', align: 'center', fixedLeft: true, width: 100,
                            events: {
                                'click .detail-sublet': function (e, value, rowData, index) {
                                    M.Page.emit(URI.RENT.SUBLET.DETAIL.PAGE);
                                    IOT.setSessionStore(URI.RENT.SUBLET.DETAIL.PAGE, JSON.stringify(rowData));
                                    return false;
                                }
                            },
                            formatter: function (value, row, index) {
                                return `<a class="detail-sublet">查看</a>`;
                            }
                        }
                    ]
                });
                //权限——查看
                if (!M.Authority.checkAuthority('pallet-turn-lease-detail')) {
                    $(tableHookName).bootstrapTable('hideColumn', 'operate');//隐藏列
                }
            });
        }
    });
})();