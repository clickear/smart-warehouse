/**
 * Created by Administrator on 2017/12/12.
 */
import $ from 'jQuery';

(function () {
   let orderData = JSON.parse(IOT.getSessionStore(URI.RENT.RENTAL.DETAIL.BINDORDER.PAGE));
    let $vue = new Vue({
        el: '.bind-order-hook',
        data:{
            account:{
                orderLeaseId:''
            }
        },
        methods: {
            cancleBack: function () {
                M.Page.emitPrePage();
                M.Page.emitRefreshPage();
            },
           submitBind:function(){
               let bindingOrderSupplyList =  $('.choose-bind-order-table-hook').bootstrapTable('getSelections');
               if(bindingOrderSupplyList.length == 0){
                   layer.alert('请选择一条数据');
                   return;
               }else{
                   let params ={
                       bindingOrderSupplyList,
                       orderLeaseId:orderData.orderLeaseId
                   }
                   IOT.showOverlay('保存中，请稍等...');
                   IOT.getServerData(URI.RENT.RENTAL.DETAIL.BINDORDER.SUBMIT, params, (ret) => {
                       IOT.tips(ret.msg || '操作失败，请重试！', 'error', 1000, null);
                       IOT.hideOverlay();
                       if (ret && ret.code === 200) {
                           IOT.tips('保存成功！', 'success');
                           layer.closeAll();
                           M.Table.refresh.all();
                           M.Page.refreshPage();

                       } else {
                           IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                       }
                   });
               }
           }
        },
        created:function(){
            this.account.orderLeaseId =orderData.orderLeaseId;
        },
        mounted: function () {
            this.$nextTick(() => {
                var $accountBox = $('.bind-order-hook');
                let tableHookName1 = '.has-bind-order-table-hook';
                let tableHookName2 = '.choose-bind-order-table-hook';
                //初始化时间插件
                modal.initDate("scanStartTime","scanEndTime");

                var $form1 = $accountBox.find('.company_search');
                var $form2 = $accountBox.find('.form-search-hook');
                var $tableHook1 =  $accountBox.find(tableHookName1).bootstrapTable({
                    scrollbar: 'has-bind-order-table-hook-body',
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
                    pageSize: 5,
                    // fixedColumns: true,
                    customButton: '',
                    customQueryParams: function (params) {
                        var formParams = $form1.serializeJson();
                        var queryParams = $.extend({}, params, formParams);
                        return queryParams;
                    },
                    onLoadSuccess: function (data) {
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
                        },
                        {
                            field: 'placeOrderUser', title: '下单人', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'placeOrderTime', title: '下单时间', align: 'center', fixedLeft: true,tips: true,
                        },

                    ]
                });

                // 查询
                $accountBox.find('.search-hook').on('click', function () {
                    $(tableHookName2).bootstrapTable('onCustomSearch');
                });
                $('.search-hook').on('click', function () {
                    $(tableHookName2).bootstrapTable('onCustomSearch');
                });
                var $tableHook2 =  $accountBox.find(tableHookName2).bootstrapTable({
                    scrollbar: 'choose-bind-order-table-hook-body',
                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端*/
                    method: 'post',
                    //   url: URI.RENT.INVENTORY.LIST,
                    url: URI.RENT.RENTAL.DETAIL.BINDORDER.CANLIST,
                    debug: false,
                    cache: false,
                    pageNumber: 1,
                    pageSize: 10,
                    // fixedColumns: true,
                    customButton: '',
                    customQueryParams: function (params) {
                        var formParams = $form2.serializeJson();
                        var queryParams = $.extend({}, params, formParams);
                        return queryParams;
                    },
                    onLoadSuccess: function (data) {
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
