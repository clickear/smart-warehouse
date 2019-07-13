/**
 * Created by Administrator on 2017/10/11.
 */
import $ from 'jQuery';

(function () {
    let $vue = new Vue({
        el: '.rental-main-hook',
        data: {
            leaseMode: [{id: 1, name: '平台出租'}, {id: 2, name: '代理商出租'}],
            leaseType: [{id: 1, name: '短租'}, {id: 2, name: '长租'}],
            receiveStatus:[{id: 1, name: '部分收货'}, {id: 2, name: '全部收货'},{id: 3, name: '订单取消'}],
            orderStatus  : [{id: 0, name: '未审核'}, {id: 1, name: '已审核'}, {id: 2, name: '已完结'}, {id: 3, name: '已废弃'}],
            paymentFlag:[{id:1,name:'未打款'},{id:2,name:'已打款至第三方银行'},{id:3,name:'已收款'}],
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
            newLease: function () {
                M.Page.emit(URI.RENT.RENTAL.CLIENT_CREATE_RENTAL.PAGE);
            }
        },
        mounted: function () {
            this.$nextTick(() => {
                var $accountBox = $('.rental-hook');
                $accountBox.find('.area-hook').selectpicker({width: '120px'});
                $accountBox.find('.order-status-hook').selectpicker({width: '80px'});
                //初始化时间插件
                modal.initDate("startdate","enddate");
                let tableHookName = '.rental-table-hook';
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
                    scrollbar: 'rental-table-body',
                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端
                    method: 'post',
                    url: URI.RENT.RENTAL.LIST,
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
                    onLoadSuccess: function (data) {
                       //console.log(JSON.stringify(data));
                    },
                    onLoadError: function (status, xhr) {
                    },
                    onCheckAll: function (rows) {

                    },
                    columns: [
                        {
                            field: 'no', title: '序号', align: 'center', width: 50,tips: true,
                            formatter: function (val, rowData, index) {
                                return index + 1;
                            }
                        },
                        {
                            field: 'orderNo', title: '订单号', align: 'center', fixedLeft: true,tips: true,
                        },
                        {
                            field: 'totalQuantity', title: '托盘总数', align: 'center',fixedLeft: true,width:80
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
                            return  Math.ceil((parseInt((row.leaseEndDate-row.leaseStartDate)/24/60/60/1000)/365))+'年'
                          }
                        },
                     /*   {
                            field: 'confirmStatus', title: '确认状态', align: 'center', fixedLeft: true,width:80,
                            formatter: function (value, row, index) {
                                    /!* 0未确认；1已确认； *!/
                                    if (value == false ){return "未确认";}
                                    else if (value == true ){return "已确认";}
                            }
                        },*/
                        {
                            field: 'customerName', title: '承租客户', align: 'center', fixedLeft: true,tips: true,
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
                            field: 'paymentFlag', title: '打款标志', align: 'center', fixedLeft: true,tips: true,
                            formatter:function(value,row,index){
                                   if (value == 1 ){return "未打款";}
                                    else if (value == 2 ){return "已打款至第三方银行";}
                                    else if (value == 3 ){return "已收款";}

                            }
                        },
                        {
                            field: 'totalRental', title: '租赁租金', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'totalDeposit', title: '保证金', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'customerAddress', title: '目的地', align: 'center', fixedLeft: true,width: 160,tips: true
                        },
                        {
                            field: 'placeOrderTime', title: '订单日期', align: 'center', fixedLeft: true,width: 160,
                            formatter: function (value, row, index) {
                                /* 0未确认；1已确认； */
                                return new Date(value).Format('yyyy-MM-dd hh:mm:ss');
                            }
                        },
                        {
                            field: 'operate', title: '操作', align: 'center', fixedLeft: true, width: 100,
                            events: {
                                'click .detail-account': function (e, value, rowData, index) {
                                    M.Page.emit(URI.RENT.RENTAL.DETAIL.PAGE);
                                    IOT.setSessionStore(URI.RENT.RENTAL.DETAIL.PAGE, JSON.stringify(rowData));
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
                if (!M.Authority.checkAuthority('pallet-lease-detail')) {
                    $(tableHookName).bootstrapTable('hideColumn', 'operate'); // 隐藏列
                }
            });
        }
    });
})();





















