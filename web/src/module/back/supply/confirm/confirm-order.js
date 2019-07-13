/**
 * Created by Administrator on 2017/10/11.
 */
import $ from 'jQuery';

(function () {
    let $vue = new Vue({
        el: '.confirm-main-hook',
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
            // 新增生产下单页面
            newOrder: function () {
                M.Page.emit(URI.RUN.BUSINESS_CONTROL.CLIENT_CREATE_BUY.PAGE);
            }
        },
        mounted: function () {
            this.$nextTick(() => {
                var $accountBox = $('.confirm-hook');
                $accountBox.find('.area-hook').selectpicker({width: '120px'});
                $accountBox.find('.confirm-status-hook').selectpicker({width: '80px'});
                //查询
                $accountBox.find('.search-hook').on('click', function () {
                    $(tableHookName).bootstrapTable('onCustomSearch');
                });
                $accountBox.find('input[name=orderStartTime]').datetimepicker({
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
                let tableHookName = '.confirm-table-hook';
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
                    scrollbar: 'confirm-table-body',
                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端
                    method: 'post',
                    url: URI.SUPPLY.CONFIRM.LIST,
                    debug: false,
                    cache: false,
                    pageNumber: 1,
                    pageSize: 20,
                    // fixedColumns: true,
                    customButton: '',
                    customQueryParams: function (params) {
                        var formParams = $form.serializeJson();
                        var queryParams = $.extend({}, params, formParams);
                        console.log(queryParams);
                        return queryParams;
                    },
                    onLoadSuccess: function (data) {
                      /*  console.log(data)*/
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
                            field: 'orderNo', title: '订单号', align: 'center', fixedLeft: true,width: 160
                        },
                        {
                            field: 'totalQuantity', title: '托盘总数', align: 'center', fixedLeft: true,width: 80
                        },
                        {
                            field: 'manufacturer', title: '生产单位', align: 'center', fixedLeft: true,tips:true
                        },
                        {
                            field: 'customerName', title: '客户单位', align: 'center', fixedLeft: true,tips:true
                        },
                        {
                            field: 'deliveryAddress', title: '收货地址', align: 'center', fixedLeft: true,width:200,tips:true
                        },
                        {
                            field: 'confirmStatus', title: '确认状态', align: 'center', fixedLeft: true,width:80,
                            formatter: function (val, rowData, index) {
                                if (val == '0'){return "未确认";}
                                else if (val == '1' ){return "已确认";}
                            }
                        },
                        {
                            field: '', title: '收货数量', align: 'center', fixedLeft: true,width:80,
                            formatter: function (val, rowData, index) {
                                if (rowData.confirmStatus=== false) {
                                    return "-";
                                }
                                else if (rowData.confirmStatus === true) {
                                    return rowData.totalQuantity;
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
                            field: 'placeOrderUser', title: '下单人', align: 'center', fixedLeft: true,tips:true
                        },
                        {
                            field: 'receiveTime', title: '收货时间', align: 'center', fixedLeft: true,width: 155,
                            formatter: function (value, row, index) {
                                /* 0未确认；1已确认； */
                                return value != null ?  new Date(value).Format('yyyy-MM-dd hh:mm:ss') : "-";
                            }
                        },
                        {
                            field: 'operate', title: '操作', align: 'center', fixedLeft: true, width: 80,
                            events: {
                                'click .detail-account': function (e, value, rowData, index) {
                                    M.Page.emit(URI.SUPPLY.CONFIRM.DETAIL.PAGE);
                                    IOT.setSessionStore(URI.SUPPLY.CONFIRM.DETAIL.PAGE, JSON.stringify(rowData));
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
                if (!M.Authority.checkAuthority('product-order-confirm-detail')) {
                    $(tableHookName).bootstrapTable('hideColumn', 'operate'); // 隐藏列
                }
            });
        }
    });
})();





















