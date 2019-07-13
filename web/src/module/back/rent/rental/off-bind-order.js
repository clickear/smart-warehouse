/**
 * Created by Administrator on 2017/12/12.
 */
import $ from 'jQuery';

(function () {
     let orderData = JSON.parse(IOT.getSessionStore(URI.RENT.RENTAL.DETAIL.OFFORDER.PAGE));
    let $vue = new Vue({
        el: '.off-bind-order-hook',
        methods: {
            cancleBack: function () {
                M.Page.emitPrePage();
                // M.Page.emitRefreshPage();
            },
            offBind:function(){
                let bindingOrderSupplyList =  $('.off-bind-order-table-hook').bootstrapTable('getSelections');
                if(bindingOrderSupplyList.length == 0){
                    layer.alert('请选择一条数据');
                    return false;
                }else{
                    layer.confirm(' &nbsp;&nbsp; &nbsp;&nbsp;是否确认解除绑定该订单？', {
                        btn: ['确定','取消'] //按钮
                    }, function(){
                            let params ={
                                bindingOrderSupplyList,
                                orderLeaseId:orderData.orderLeaseId
                            }
                            IOT.showOverlay('保存中，请稍等...');
                            IOT.getServerData(URI.RENT.RENTAL.DETAIL.OFFORDER.OFF, params, (ret) => {
                                IOT.tips(ret.msg || '操作失败，请重试！', 'error', 1000, null);
                                IOT.hideOverlay();
                                if (ret && ret.code === 200) {
                                    IOT.tips('解除绑定成功！', 'success');
                                    layer.closeAll();
                                    M.Table.refresh.all();
                                    M.Page.emitPrePage();
                                    M.Page.emitRefreshPage();

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
        created:function(){
        },
        mounted: function () {
            this.$nextTick(() => {
                var $accountBox = $('.off-bind-order-hook');
                let tableHookName = '.off-bind-order-table-hook';
                var $tableHook =  $accountBox.find(tableHookName).bootstrapTable({
                    scrollbar: 'choose-bind-order-table-hook-body',
                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端*/
                    method: 'post',
                    //   url: URI.RENT.INVENTORY.LIST,
                    url: URI.RENT.RENTAL.DETAIL.BINDORDER.LIST,
                    debug: false,
                    cache: false,
                    pageNumber: 1,
                    pageSize: 20,
                    // fixedColumns: true,
                    customButton: '',
                    customQueryParams: function (params) {
                        var formParams = {
                            orderLeaseId: orderData.orderLeaseId
                        }
                        var queryParams = $.extend({}, params, formParams);
                        return queryParams;
                    },
                    onLoadSuccess: function (data) {
                        console.log(data);
                    },
                    onLoadError: function (status, xhr) {
                    },
                    onCheckAll: function (rows) {

                    },
                    columns: [
                        {
                            field: '', checkbox: true, align: 'center', fixedLeft: true, width: 60,
                        },
                        {
                            field: 'no', title: '序号', align: 'center', width: 50,
                            formatter: function (val, rowData, index) {
                                return index + 1;
                            }
                        },
                        {
                            field: 'orderNo', title: '生产订单号', align: 'center', fixedLeft: true,width:170,tips: true,
                        },
                        {
                            field: 'totalQuantity', title: '托盘总数', align: 'center', fixedLeft: true,width:170
                        },
                        {
                            field: 'manufacturer', title: '生产单位', align: 'center', fixedLeft: true,width:170,tips: true,
                        },
                        {
                            field: 'orderStatusValue', title: '订单状态', align: 'center', fixedLeft: true,width:170
                        },
                        {
                            field: 'receiveTime', title: '送货时间', align: 'center', fixedLeft: true,width:170,tips: true,
                            formatter: function (value, row, index) {
                                /* 0未确认；1已确认； */
                                return value != null ?  new Date(value).Format('yyyy-MM-dd hh:mm:ss') : "-";
                            }
                        },
                        {
                            field: 'placeOrderUser', title: '下单人', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'placeOrderTime', title: '下单时间', align: 'center', fixedLeft: true,tips: true,
                            formatter: function (value, row, index) {
                                /* 0未确认；1已确认； */
                                return value != null ?  new Date(value).Format('yyyy-MM-dd hh:mm:ss') : "-";
                            }
                        },

                    ]
                });
            });
        }
    });
})();
