/**
 * Created by Administrator on 2017/10/11.
 */
require('../../../../less/back/rent/rent_detail.less');
let orderData = JSON.parse(IOT.getSessionStore(URI.SUPPLY.ORDER.DETAIL.BINDING.PAGE));
import $ from 'jQuery';
(function () {
    let $vue = new Vue({
        el: '.binding-order-hook',
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
            Binding:function(){
                let bindingOrderSupplyList =  $('.choose-binding-order-table-hook').bootstrapTable('getSelections');
                if(bindingOrderSupplyList.length == 0){
                    layer.alert('请选择一条数据');
                    return false;
                }else{
                    layer.confirm(' &nbsp;&nbsp; &nbsp;&nbsp;是否确认绑定该订单？', {
                        btn: ['确定','取消'] //按钮
                    }, function(){
                        let params ={
                            orderLeaseId:bindingOrderSupplyList[0].orderLeaseId,
                            orderSupplyId:orderData.orderSupplyId
                        };
                        IOT.showOverlay('保存中，请稍等...');
                        IOT.getServerData(URI.SUPPLY.ORDER.DETAIL.BINDING.BIND, params, (ret) => {
                            IOT.tips(ret.msg || '操作失败，请重试！', 'error', 1000, null);
                            IOT.hideOverlay();
                            if (ret && ret.code === 200) {
                                IOT.tips('绑定成功！', 'success');
                                layer.closeAll();
                                M.Page.emitPrePage();
                                M.Page.emitPrePage();
                                M.Table.refresh.all();


                            } else {
                                IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                            }
                        });
                    }, function(){
                        //取消
                    });

                }

            }
        },
        mounted: function () {
            var $accountBox = $('.binding-order-hook');
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
                let tableHookName = '.choose-binding-order-table-hook';
                let $form = $('.bind-search-hook');
                // 查询
                $('.search-hook').on('click', function () {
                    $(tableHookName).bootstrapTable('onCustomSearch');
                });
                var $tableHook = $accountBox.find(tableHookName).bootstrapTable({
                    scrollbar: 'choose-binding-order-table-body',
                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端
                    method: 'post',
                    url: URI.SUPPLY.ORDER.DETAIL.BINDING.LIST,
                    debug: false,
                    cache: false,
                    pageNumber: 1,
                    pageSize: 10,
                    // fixedColumns: true,
                    customButton: '',
                    customQueryParams: function (params) {
                        let formParams = $form.serializeJson();
                        let queryParams = $.extend({}, params, formParams);
                        return queryParams;
                    },
                    onLoadSuccess: function (data) {
                        console.log(JSON.stringify(data));
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
                            field: 'orderNo', title: '租赁订单ID', align: 'center', fixedLeft: true
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
