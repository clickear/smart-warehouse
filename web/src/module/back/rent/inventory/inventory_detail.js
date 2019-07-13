/**
 * Created by Administrator on 2017/10/13.
 */
require('../../../../less/back/rent/rent_detail.less');
import $ from 'jQuery';

(function () {
    let orderData = JSON.parse(IOT.getSessionStore(URI.RENT.INVENTORY.DETAIL.PAGE));
    let $vue = new Vue({
        el: '.inventory-detail-hook',
        data: {
            account:{
                companyName:'',
                linkmanAddress:'',
                linkmanPhone:'',
                artificialPersonName:'',
                storageName:'',
                woodinessStock:'',
                plasticStock:'',
                dieStock:'',
                otherStock:'',
                address:'',
                linkmanName:'',
                phone:'',
                companyId:'',
                woodinessStockAll:'',
                plasticStockAll:'',
                dieStockAll:'',
                otherStockAll:'',


            }
        },
        methods: {
            cancleBack: function () {
                M.Page.emitPrePage();
                // M.Page.emitRefreshPage();
            },
            contractManagement:function(){
                M.Page.emit(URI.RENT.ALLOCATION.DETAIL.CONTRACTMANAGEMENT.PAGE);
            },
            sureOrder:function(){
                M.Page.emit(URI.RENT.ALLOCATION.DETAIL.SUREORDER.PAGE);
            }
        },
        created:function(){
            this.account=orderData;
            IOT.getServerData(URI.RENT.INVENTORY.DETAIL.DATA_ALL, {companyId: orderData.companyId}, (ret) => {
                if (ret.code === 200) {

                    this.account = $.extend({}, this.account, ret.data);
                } else {
                    IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                }
            });
        },

        mounted: function () {
           this.$nextTick(() => {
               var $accountBox = $('.inventory-detail-hook');
               let tableHookName = '.detail-inventory-table-hook';
               var $form = $('.company_search');
            //    var $contractTable = $('.detail-inventory-table-hook');
                var $tableHook =  $accountBox.find(tableHookName).bootstrapTable({
                    scrollbar: 'detail-inventory-table-body',
                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端*/
                    method: 'post',
                 //   url: URI.RENT.INVENTORY.LIST,
                    url: URI.RENT.INVENTORY.DETAIL.DATA,
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
                        console.log(data);
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
                            field: 'storageName', title: '网点名称', align: 'center', fixedLeft: true,width:170
                        },
                        {
                            field: 'plasticStock', title: '塑料托盘存量', align: 'center', fixedLeft: true,width:170
                        },
                        {
                            field: 'woodinessStock', title: '木托盘存量', align: 'center', fixedLeft: true,width:170
                        },
                        {
                            field: 'dieStock', title: '压模托盘存量', align: 'center', fixedLeft: true,width:170
                        },
                        {
                            field: 'otherStock', title: '其他托盘存量', align: 'center', fixedLeft: true,width:170
                        },
                        {
                            field: 'address', title: '网点地址', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'linkmanName', title: '网点联系人', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'phone', title: '联系电话', align: 'center', fixedLeft: true
                        }

                    ]
                });
            });
        }
    });
})();




















