/**
 * Created by Administrator on 2017/10/11.
 */
require('../../../../less/back/rent/rent.less');
import $ from 'jQuery';
(function () {
    let $vue = new Vue({
        el: '.client-create-relet-hook',
        data: {
        },
        methods: {
            cancleBack: function () {
                M.Page.emitPrePage();
                // M.Page.emitRefreshPage();
            },
            nextStep:function(){
                var selectContent =  $('.create-relet-table-hook').bootstrapTable('getSelections')[0];
                if(typeof(selectContent) == 'undefined'){
                    layer.alert('请选择一条数据');
                    return;
                }else{

                    /* console.log(selectContent);*/
                    M.Page.emit(URI.RENT.RELET.NEXT_CREATE_RELET.PAGE);
                    IOT.setSessionStore(URI.RENT.RELET.NEXT_CREATE_RELET.PAGE, JSON.stringify(selectContent));
                }

            }
        },
        mounted: function () {
            this.$nextTick(() => {
                var $accountBox = $('.create-relet-hook');
                $accountBox.find('.area-hook').selectpicker({width: '120px'});
                $accountBox.find('.order-status-hook').selectpicker({width: '80px'});
                var tableHookName = '.create-relet-table-hook';
                // 查询
                $accountBox.find('.search-relet').on('click', function () {
                    $(tableHookName).bootstrapTable('onCustomSearch');
                });
                //初始化时间插件
                modal.initDate("orderStartTime","orderEndTime");
                var $form = $accountBox.find('.fomr-search-relet');
                var $tableHook = $accountBox.find(tableHookName).bootstrapTable({
                    scrollbar: 'create-relet-table-body',
                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端
                    method: 'post',
                    url: URI.RENT.RELET.NEXT_LIST,
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
                            field: '', radio: true, align: 'center', fixedLeft: true, width: 60,
                            events: {
                                'change .radio-hook': function (e, value, row, index) {
                                    console.log('单选框: ' + value);
                                }
                            }
                        },
                        {
                            field: 'orderNo', title: '订单号', align: 'center', fixedLeft: true,
                        },
                        {
                            field: 'totalQuantity', title: '托盘总数', align: 'center', fixedLeft: true,width:120
                        },
                        {
                            field: 'leaseMode', title: '租赁方式', align: 'center',width:120, fixedLeft: true,
                            formatter: function (value, row, index) {
                                /* 1平台出租；2代理商出租； */
                                if (value === 1 ){return "平台出租";}
                                else if (value === 2 ){return "代理商出租";}
                            }
                        },
                        {
                            field: 'leaseType', title: '租赁类型', align: 'center', fixedLeft: true,
                            formatter: function (value, row, index) {
                                /* 1短租；2长租； */
                                if (value === 1 ){return "短租";}
                                else if (value === 2 ){return "长租";}
                            }
                        },
                        {
                            field: '', title: '租期', align: 'center', fixedLeft: true,width:100,formatter: function (value, row, index) {
                            return  Math.ceil((parseInt((row.leaseEndDate-row.leaseStartDate)/24/60/60/1000)/365))+'年'
                        }
                        },
                        {
                            field: 'customerName', title: '承租客户', align: 'center', tips: true,fixedLeft: true
                        },
                        {
                            field: 'totalRental', title: '租赁租金', align: 'center', fixedLeft: true,width:100
                        },
                        {
                            field: 'customerAddress', title: '目的地', align: 'center', fixedLeft: true,tips: true
                        },
                        {
                            field: 'placeOrderTime', title: '订单日期', align: 'center', fixedLeft: true,
                            formatter: function (value, row, index) {
                                /* 0未确认；1已确认； */
                                return new Date(value).Format('yyyy-MM-dd h:m:s');
                            }
                        },
                    ]
                });
            });
        }
    });
})();




















