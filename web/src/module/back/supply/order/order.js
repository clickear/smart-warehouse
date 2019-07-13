/**
 * Created by Administrator on 2017/10/11.
 */
import $ from 'jQuery';

(function () {

    let $vue = new Vue({
        el: '.order-main-hook',
        data: {
            supplyStatus  : [{id: 0, name: '未审核'}, {id: 1, name: '已审核'}, {id: 2, name: '已完结'}, {id: 3, name: '已废弃'}],
            paymentFlag:[{id:1,name:'未打款'},{id:2,name:'已打款至第三方银行'},{id:3,name:'已收款'}],
            orderTimeType:[{id:1,name:'下单时间'},{id:2,name:'送货时间'},{id:3,name:'收货时间'}],
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
            // 新增订单页面
            newOrder: function () {
                M.Page.emit(URI.SUPPLY.ORDER.BIND_PRODUCTION.PAGE);
            }
        },
        mounted: function () {
            this.$nextTick(() => {

                var $accountBox = $('.order-hook');
                $accountBox.find('.area-hook').selectpicker({width: '120px'});
                $accountBox.find('.order-status-hook').selectpicker({width: '80px'});
                $accountBox.find('input[name=orderStartTime]').datetimepicker({
                    width: '320px',
                    format: 'Y-m-d',
                    formatDate: 'Y-m-d',
                    scrollMonth: false,
                    scrollTime: false,
                    scrollInput: false,
                    timepicker: false // 关闭时间选项
                });
                $accountBox.find('input[name=orderEndTime]').datetimepicker({
                    width: '320px',
                    format: 'Y-m-d',
                    formatDate: 'Y-m-d',
                    scrollMonth: false,
                    scrollTime: false,
                    scrollInput: false,
                    timepicker: false // 关闭时间选项
                });
                let tableHookName = '.order-table-hook';
                var $form = $accountBox.find('.form-search-hook');
                // 省份-城市-区域
                // 查询
                $accountBox.find('.search-hook').on('click', function () {
                    $(tableHookName).bootstrapTable('onCustomSearch');
                });
                //初始化，默认不选择任何一个
                var distpicker = {
                    init:function () {
                        $('#distpicker').distpicker();
                    }
                };
                //初始化-省份、城市、区县
                distpicker.init();
                var $tableHook = $accountBox.find(tableHookName).bootstrapTable({
                  scrollbar: 'order-table-body',
                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端
                    method: 'post',
                    url: URI.SUPPLY.ORDER.LIST,
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
                        console.log(data)
                        $('#totalOrder').text(data.total);
                        if(data.total > 0){
                            $('#totalQuality').text(data.rows[0].allPalletCount);
                            /*   console.log(data.rows[0])*/
                        }
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
                            field: 'orderNo', title: '订单号', align: 'center', fixedLeft: true,width: 150,tips:true
                        },
                        {
                            field: 'totalQuantity', title: '托盘总数', align: 'center', fixedLeft: true,width:100
                        },
                        {
                            field: 'manufacturer', title: '生产单位', align: 'center',tips: true, fixedLeft: true
                        },
                        {
                            field: 'deliveryAddress', title: '收货地址', align: 'center',tips: true, fixedLeft: true
                        },
                        {
                            field: 'paymentFlag', title: '打款标志', align: 'center', fixedLeft: true,width: 80,
                            formatter: function (val, rowData, index) {
                                if( val== 1){
                                  return  "未打款";
                                }else if(val == 2){
                                    return  "已打款至第三方银行";
                                }else if(val == 3){
                                    return  "已收款";
                                }
                            }
                        },
                        {
                            field: 'supplyStatus', title: '订单状态', align: 'center', fixedLeft: true,width: 80,
                            formatter: function (val, rowData, index) {
                                if( val== 0){
                                    return  "未审核";
                                }else if(val == 1){
                                    return  "已审核";
                                }else if(val == 2){
                                    return  "已完结";
                                }else if(val == 3){
                                    return  "已废弃";
                                }
                            }
                        },
                        {
                            field: 'deliveryTime', title: '送货时间', align: 'center', fixedLeft: true,width: 155,
                            formatter: function (value, row, index) {
                                /* 0未确认；1已确认； */
                                return value != null ?  new Date(value).Format('yyyy-MM-dd hh:mm:ss') : "-";
                            }
                        },
                        {
                            field: 'receiveTime', title: '收货时间', align: 'center', fixedLeft: true,width: 155,
                            formatter: function (value, row, index) {
                                /* 0未确认；1已确认； */
                                return value != null ?  new Date(value).Format('yyyy-MM-dd hh:mm:ss') : "-";
                            }
                        },
                        {
                            field: 'placeOrderUser', title: '下单人', align: 'center', fixedLeft: true,width: 100
                        },
                        {
                            field: 'placeOrderTime', title: '下单时间', align: 'center', fixedLeft: true,width: 155,
                            formatter: function (value, row, index) {
                                /* 0未确认；1已确认； */
                                return value != null ?  new Date(value).Format('yyyy-MM-dd hh:mm:ss') : "-";
                            }
                        },
                        {
                            field: 'operate', title: '操作', align: 'center', fixedLeft: true, width: 80,
                            events: {
                                'click .detail-account': function (e, value, rowData, index) {
                                    M.Page.emit(URI.SUPPLY.ORDER.DETAIL.PAGE);
                                    IOT.setSessionStore(URI.SUPPLY.ORDER.DETAIL.PAGE, JSON.stringify(rowData));
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
                if (!M.Authority.checkAuthority('product-order-detail')) {
                    $(tableHookName).bootstrapTable('hideColumn', 'operate');//隐藏列
                }
            });
        }
    });
})();





















