/**
 * Created by Administrator on 2017/10/11.
 */
require('../../../../less/back/rent/rent_detail.less');
import $ from 'jQuery';
(function () {
    let $vue = new Vue({
        el: '.create-allocation-hook',
        data: {
            info:{
                orderNo: '',
                orderLeaseId: '',
                customerAddress: '',
                customerPhone: '',
                returnType: '',//退板类型
                returnMode: '1',//退板方式
                distributionMode: '1',//配送方式
                palletTypemNum: '0',
                palletTypesNum: '0',
                palletTypeyNum: '0',
                palletTypeqNum: '0',
                palletQuantityM: '0',
                palletQuantityS: '0',
                palletQuantityY: '0',
                palletQuantityQ: '0',
                totalQuantity: '0',//托盘总数
                totalDeposit: '0',//保证金总计
                returnDeposit: '0',//保证金退费
                //returnCosts:'',//运输扣除费用
                returnActual: '0',//实际退费
                //totalCosts: '0',//费用总计
                returnAddress: '',//退板地址
                nextChange:''//选择下一步
            }
        },
        created: function () {
            this.info.nextChange=1;
        },
        methods: {
            cancleBack: function () {
                M.Page.emitPrePage();
                // M.Page.emitRefreshPage();
            },
            nextStep:function(){
                let selectContent =  $('.create-allocation-table-hook').bootstrapTable('getSelections')[0];
                if(typeof(selectContent) == 'undefined'){
                    layer.alert('请选择一条数据');
                    return false;
                }else {
                   let gender = $("input[name='nextChange']:checked").val();
                   if (gender == 1) {
                        M.Page.emit(URI.RUN.PATCH_ALLOCATION.ADD.NEXT.PAGE);
                        IOT.setSessionStore(URI.RUN.PATCH_ALLOCATION.ADD.NEXT.PAGE, JSON.stringify(selectContent));
                    } else if (gender == 2) {
                       M.Page.emit(URI.RUN.PATCH_ALLOCATION.ADD.INPUT.PAGE);
                       IOT.setSessionStore(URI.RUN.PATCH_ALLOCATION.ADD.NEXT.PAGE, JSON.stringify(selectContent));
                   }else {
                        M.Page.emit(URI.RUN.PATCH_ALLOCATION.ADD.RESULT.PAGE);
                        IOT.setSessionStore(URI.RUN.PATCH_ALLOCATION.ADD.RESULT.PAGE, JSON.stringify(selectContent));
                    }
                }
            }
        },
        mounted: function () {
            var $accountBox = $('.create-return-hook');
            this.$nextTick(() => {
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
                let tableHookName = '.create-allocation-table-hook';
                let $form = $('.fomr-search-return');
                // 查询
                $('.search-hook').on('click', function () {
                    $(tableHookName).bootstrapTable('onCustomSearch');
                });
                var $tableHook = $accountBox.find(tableHookName).bootstrapTable({
                    scrollbar: 'create-allocation-table-body',
                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端
                    method: 'post',
                    url: URI.RENT.RETURN.CLIENT_CREATE_RETURN.LIST,
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
                                    console.log('单选框: ' + value);
                                }
                            }
                        },
                        {
                            field: 'no', title: '序号', align: 'center', width: 50,
                            formatter: function (val, rowData, index) {
                                return index + 1;
                            }
                        },
                        {
                            field: 'orderNo', title: '订单ID', align: 'center', fixedLeft: true
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
    });
})();
$('.get_type label').click(function(){
    $('.get_type label').addClass('unchecked');
    $(this).removeClass('unchecked');
});
