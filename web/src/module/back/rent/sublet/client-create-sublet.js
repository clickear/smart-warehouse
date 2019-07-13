require('../../../../less/back/rent/rent_detail.less');
import $ from 'jQuery';
(function () {
    let $vue = null;
    let list;
    $vue = new Vue({
        el: '.create-sublet-hook',
        data: {
            info:{
                palletTypemNum:'0',
                palletTypesNum:'0',
                palletTypeyNum:'0',
                palletTypeqNum:'0',
                totalQuantity:'0',//转租数量
                totalRental:'',//租金汇总
                totalDeposit:'',//保证金汇总
                totalCosts:'',//费用总计
                leaseStartDateString:'',
                leaseEndDateString:'',
                customerId:'',
                customerAddress:'',
                customerPhone:'',
                customerName:'',
                pickupMode:'1',//取货方式
                pickupAddress:'',//收货地址
                remark:'',//备注
                storageId:'',//出货网点
                palletCount:''//出货网点对应的托盘总数
            },
            items:[],
        },
        methods: {
            cancleBack: function () {
                M.Page.emitPrePage();
            },
            nextStep:function(){
                let selectContent =  $('.create-sublet-table-hook').bootstrapTable('getSelections')[0];
                if(typeof(selectContent) == 'undefined'){
                    layer.alert('请选择一条数据');
                    return false;
                }else{
                    M.Page.emit(URI.RENT.SUBLET.CLIENT_NEXT_SUBLET.PAGE);
                    IOT.setSessionStore(URI.RENT.SUBLET.CLIENT_NEXT_SUBLET.PAGE, JSON.stringify(selectContent));
                }
            }
        },
        mounted: function () {
            var $accountBox = $('.create-sublet-hook');
            this.$nextTick(() => {
                //初始化时间插件
                modal.initDate("creat-startdate","creat-enddate");
                let tableHookName = '.create-sublet-table-hook';
                let $form = $('.form-search-sublet');
                // 查询
                $('.search-hook').on('click', function () {
                    $(tableHookName).bootstrapTable('onCustomSearch');
                });
                var $tableHook = $accountBox.find(tableHookName).bootstrapTable({
                    scrollbar: 'create-sublet-table-body',
                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端
                    method: 'post',
                    url: URI.RENT.SUBLET.CLIENT_CREATE_SUBLET.LIST,
                    debug: false,
                    cache: false,
                    pageNumber: 1,
                    pageSize: 20,
                    // fixedColumns: true,
                    customButton: '',
                    customQueryParams: function (params) {
                        let formParams = $form.serializeJson();
                        let queryParams = $.extend({}, params, formParams);
                        return queryParams;
                    },
                    columns: [
                        {
                            field: '', radio: true, align: 'center', fixedLeft: true, width: 60,
                            events: {
                                'change .radio-hook': function (e, value, row, index) {
                                    //console.log('单选框: ' + value);
                                }
                            }
                        },
                        {
                            field: 'orderNo', title: '订单号', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'totalQuantity', title: '托盘总数', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'leaseMode', title: '租赁方式', align: 'center', fixedLeft: true,
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
                            field: 'count', title: '租期', align: 'center', fixedLeft: true,formatter: function (value, row, index) {
                            return parseInt((row.leaseEndDate - row.leaseStartDate) / 24 / 60 / 60 / 1000);
                        }
                        },
                        {
                            field: 'customerName', title: '承租客户', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'totalRental', title: '租赁租金', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'totalDeposit', title: '保证金', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'pickupAddress', title: '目的地', align: 'center', fixedLeft: true,width: 180
                        },
                        {
                            field: 'placeOrderTime', title: '订单日期', align: 'center', fixedLeft: true,width: 180,
                            formatter: function (value, row, index) {
                                return new Date(value).Format('yyyy-MM-dd hh:mm:ss');
                            }
                        }
                    ]
                });
            });
        }
    })
})();