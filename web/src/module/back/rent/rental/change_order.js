
/**
 * Created by Administrator on 2017/10/11.
 */
require('../../../../less/back/rent/rent_detail.less');
import $ from 'jQuery';
(function () {
    let orderData = JSON.parse(IOT.getSessionStore(URI.RENT.RENTAL.DETAIL.CHANGEORDER.PAGE));
    Vue.filter('formatPrice', function(value) {
        if(isNaN(value)||value ==null){
            return '';
        }else{
            return "￥"+value+"元" ;
        }
    });
    let $vue = null;
    $vue = new Vue({
        el: '.change-order-hook',
        data: {
            rental:{
                'orderNo': '',         //订单号
                'customerName': '',  //承租客户
                'customerAddress': '', //客户地址
                'customerPhone': '', //客户联系电话
                'totalQuantity':'',//托盘总数
                'palletTypemNum': '',//木质托盘数量
                'palletTypesNum': '',//塑料托盘数量
                'palletTypeyNum': '',//压模托盘数量
                'palletTypeqNum': '',//其他托盘数量
                'totalRental': '',//租金汇总
                'totalDeposit': '',//保证金汇总
                'totalCosts': '',//费用总计
            },
        },
        created: function () {
            $("table.relet-acord-table-hook tbody tr:first td").click();
            IOT.getServerData(URI.RUN.BUSINESS_CONTROL.PLAN.DETAIL.RENTDATA, {totalQuantity: orderData.totalQuantity}, (ret) => {
                if (ret.code === 200) {
                    this.rental = $.extend({}, this.rental, ret.data);
                } else {
                    IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                }
            });
        },
        computed:{
            totalRental:function(){          //合计租金详情
                return this.rental.totalRental;
            },
            totalDeposit:function(){          //合计保证金详情
                return this.rental.totalDeposit;
            },
            totalCosts:function(){          //总费用详情
                return this.rental.totalCosts;
            },
            palletTypemRentMoney:function(){
                return  Math.round((parseInt(this.rental.palletTypemNum)*parseFloat(this.rental.rentMoney)) * 100) / 100;
            },
            palletTypemCautionMoney:function(){
                return   Math.round((parseInt(this.rental.palletTypemNum)*parseFloat(this.rental.cautionMoney))* 100) / 100 ;
            },
            palletTypesRentMoney:function(){
                return   Math.round((parseInt(this.rental.palletTypesNum)*parseFloat(this.rental.rentMoney))* 100) / 100 ;
            },
            palletTypesCautionMoney:function(){
                return   Math.round((parseInt(this.rental.palletTypesNum)*parseFloat(this.rental.cautionMoney))* 100) / 100 ;
            },
            palletTypeyRentMoney:function(){
                return  Math.round((parseInt(this.rental.palletTypeyNum)*parseFloat(this.rental.rentMoney))* 100) / 100 ;
            },
            palletTypeyCautionMoney:function(){
                return   Math.round((parseInt(this.rental.palletTypeyNum)*parseFloat(this.rental.cautionMoney))* 100) / 100 ;
            },
            palletTypeqRentMoney:function(){
                return  Math.round((parseInt(this.rental.palletTypeqNum)*parseFloat(this.rental.rentMoney))* 100) / 100 ;
            },
            palletTypeqCautionMoney:function(){
                return  Math.round((parseInt(this.rental.palletTypeqNum)*parseFloat(this.rental.cautionMoney))* 100) / 100 ;
            },

        },
        methods: {
           cancleBack: function () {
                M.Page.emitPrePage();
            }
        },
        mounted: function () {
            this.$nextTick(() => {
                var $rentalBox = $('.rental-hook');
                let tableHookName1 = '.relet-acord-table-hook';
                var $tableHook = $rentalBox.find(tableHookName1).bootstrapTable({
                    scrollbar: 'relet-acord-table-body',
                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端
                    method: 'post',
                    url: URI.RENT.RENTAL.DETAIL.CHANGEORDER.LIST1,
                    debug: false,
                    cache: false,
                    pageNumber: 1,
                    pageSize: 20,
                    // fixedColumns: true,
                    customButton: '',
                    customQueryParams: function (params) {
                         var formParams = {
                            fromOrderNo:orderData.orderNo
                        };
                       var queryParams = $.extend({}, params, formParams);
                        return queryParams;
                    },
                    onLoadSuccess: function (data) {
                       /* console.log(data);*/
                        $("table.relet-acord-table-hook tbody tr:first td").click();
                    },
                    onLoadError: function (status, xhr) {
                    },
                    onClickRow: function (row) {
                        IOT.getServerData(URI.RENT.RELET.DETAIL.DATA, {orderNo: row.orderNo}, (ret) => {
                            if (ret.code === 200) {
                                $vue.$data.rental = $.extend({}, $vue.$data.rental, ret.data);
                            } else {
                                IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                            }
                        })
                    },
                    columns: [
                        {
                            field: 'no', title: '序号', align: 'center', width: 50,
                            formatter: function (val, rowData, index) {
                                return index + 1;
                            }
                        },
                        {
                            field: 'orderNo', title: '续租订单号', align: 'center', fixedLeft: true,width:140
                        },
                        {
                            field: 'leaseType', title: '租赁类型', align: 'center', fixedLeft: true,width:100,
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
                            field: 'totalRental', title: '租赁租金', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'customerName', title: '续租客户', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'leaseStartDate', title: '续租开始日期', align: 'center', fixedLeft: true,
                            formatter: function (value, row, index) {
                                return new Date(value).Format('yyyy-MM-dd hh:mm:ss');
                            }

                        },
                        {
                            field: 'leaseEndDate', title: '续租结束日期', align: 'center', fixedLeft: true,
                            formatter: function (value, row, index) {
                                return new Date(value).Format('yyyy-MM-dd hh:mm:ss');
                            }
                        },
                        {
                            field: 'placeOrderTime', title: '续租日期', align: 'center', fixedLeft: true,
                            formatter: function (value, row, index) {
                                return new Date(value).Format('yyyy-MM-dd hh:mm:ss');
                            }
                        },
                    ]
                });
                //退板列表
                var $returnBox = $('.return-hook');
                let tableHookName2 = '.return-table-hook';
                var $tableHook = $returnBox.find(tableHookName2).bootstrapTable({
                    scrollbar: 'return-table-body',
                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端
                    method: 'post',
                    url: URI.RENT.RENTAL.DETAIL.CHANGEORDER.LIST2,
                    debug: false,
                    cache: false,
                    pageNumber: 1,
                    pageSize: 20,
                    // fixedColumns: true,
                    customButton: '',
                    customQueryParams: function (params) {
                       var formParams = {
                           fromOrderNo:orderData.orderNo
                       };
                        var queryParams = $.extend({}, params, formParams);
                      return queryParams;
                    },
                    onLoadSuccess: function (data) {
                        console.log(data);
                    },
                    onLoadError: function (status, xhr) {
                    },
                    onClickRow: function (row) {
                        IOT.getServerData(URI.RENT.RETURN.DETAIL.DATA, {orderNo: row.orderNo}, (ret) => {
                            if (ret.code === 200) {
                                $vue.$data.rental = $.extend({}, $vue.$data.rental, ret.data);
                            } else {
                                IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                            }
                        })
                    },
                    columns: [
                        {
                            field: 'no', title: '序号', align: 'center', width: 50,
                            formatter: function (val, rowData, index) {
                                return index + 1;
                            }
                        },
                        {
                            field: 'orderNo', title: '退板订单号', align: 'center', fixedLeft: true,width:140
                        },
                        {
                            field: 'returnTypeValue', title: '退板类型', align: 'center', fixedLeft: true,
                        },
                        {
                            field: 'totalQuantity', title: '退板数量', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'placeOrderUser', title: '操作员', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'totalCosts', title: '退费金额', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'placeOrderTime', title: '续租日期', align: 'center', fixedLeft: true,
                            formatter: function (value, row, index) {
                                return new Date(value).Format('yyyy-MM-dd hh:mm:ss');
                            }
                        },
                    ]
                });
                //转租列表
                var $subletBox = $('.sublet-hook');
                let tableHookName3 = '.sublet-table-hook';
                var $tableHook = $subletBox.find(tableHookName3).bootstrapTable({
                    scrollbar: 'sublet-table-body',
                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端
                    method: 'post',
                    url: URI.RENT.RENTAL.DETAIL.CHANGEORDER.LIST3,
                    debug: false,
                    cache: false,
                    pageNumber: 1,
                    pageSize: 20,
                    // fixedColumns: true,
                    customButton: '',
                    customQueryParams: function (params) {
                        var formParams = {
                            fromOrderNo:orderData.orderNo
                        };
                        var queryParams = $.extend({}, params, formParams);
                        return queryParams;
                    },
                    onLoadSuccess: function (data) {

                    },
                    onLoadError: function (status, xhr) {
                    },
                    onClickRow: function (row) {
                        IOT.getServerData(URI.RENT.RETURN.DETAIL.DATA, {orderNo: row.orderNo}, (ret) => {
                            if (ret.code === 200) {
                                $vue.$data.rental = $.extend({}, $vue.$data.rental, ret.data);
                            } else {
                                IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                            }
                        })
                    },
                    columns: [
                        {
                            field: 'no', title: '序号', align: 'center', width: 50,
                            formatter: function (val, rowData, index) {
                                return index + 1;
                            }
                        },
                        {
                            field: 'orderNo', title: '转租订单号', align: 'center', fixedLeft: true,width:140
                        },
                        {
                            field: 'leaseTypeValue', title: '租赁类型', align: 'center', fixedLeft: true,
                        },
                        {
                            field: ' ', title: '租期', align: 'center', fixedLeft: true,width:80,formatter: function (value, row, index) {
                            return  parseInt((row.leaseEndDate-row.leaseStartDate)/24/60/60/1000);
                        }
                        },
                        {
                            field: 'totalCosts', title: '转租费用', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'customerName', title: '转租客户', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'leaseStartDate', title: '转租开始日期', align: 'center', fixedLeft: true,
                            formatter: function (value, row, index) {
                                return new Date(value).Format('yyyy-MM-dd hh:mm:ss');
                            }
                        },
                        {
                            field: 'leaseEndDate', title: '转租截止日期', align: 'center', fixedLeft: true,
                            formatter: function (value, row, index) {
                                return new Date(value).Format('yyyy-MM-dd hh:mm:ss');
                            }
                        },
                        {
                            field: 'placeOrderTime', title: '转租日期', align: 'center', fixedLeft: true,
                            formatter: function (value, row, index) {
                                return new Date(value).Format('yyyy-MM-dd hh:mm:ss');
                            }
                        }
                    ]
                });
        })}
    });

    $('.change_btn .primary_btn').click(function(){
        $('.change_btn .primary_btn').removeClass('active');
        $(this).addClass('active');
        $('ul.detail_contain.accord').hide();
        $('ul.detail_contain.accord').eq($(this).index()).show();
        $('.table_contain').removeClass('show');
        $('.table_contain').eq($(this).index()).addClass('show');
        $('.table_contain').eq($(this).index()).find('tbody tr:first td').trigger("click");
        if( $('.table_contain').eq($(this).index()).find('tbody tr:first td').length ==1){
            $vue.$data.rental ={};
        }
    })
})();




















