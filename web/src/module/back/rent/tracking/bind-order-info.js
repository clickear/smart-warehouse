/**
 * Created by Administrator on 2017/12/25.
 */
/**
 * Created by Administrator on 2017/12/25.
 */
/**
 * Created by Administrator on 2017/12/12.
 */
import $ from 'jQuery';

(function () {
    let orderData = JSON.parse(IOT.getSessionStore(URI.RENT.TRACKING.DETAIL.BIND.INFO));
    let $vue = new Vue({
        el: '.bind-order-info-hook',
        data:{
            info:{
                
            }
        },
        methods: {
            cancleBack: function () {
                M.Page.emitPrePage();
                M.Page.emitRefreshPage();
            }
        },
        created:function(){
        },
        mounted: function () {
            this.$nextTick(() => {
                var $accountBox = $('.bind-order-info-hook');
                let tableHookName = '.bind-order-info-table-hook';
                var $tableHook =  $accountBox.find(tableHookName).bootstrapTable({
                    scrollbar: 'bind-order-info-table-hook-body',
                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端*/
                    method: 'post',
                    //   url: URI.RENT.INVENTORY.LIST,
                    url: URI.RENT.TRACKING.DETAIL.BIND.INFO_LIST,
                    debug: false,
                    cache: false,
                    pageNumber: 1,
                    pageSize: 10,
                    // fixedColumns: true,
                    customButton: '',
                    customQueryParams: function (params) {
                        var formParams = {
                            scanResultId:orderData.scanResultId
                        }
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
                            field: 'deviceId', title: '托盘ID', align: 'center', fixedLeft: true,tips: true,
                        },
                        {
                            field: 'activeTime', title: '激活日期', align: 'center', fixedLeft: true,tips: true,
                            formatter: function (value, row, index) {
                                /* 0未确认；1已确认； */
                                return value != null ?  new Date(value).Format('yyyy-MM-dd hh:mm:ss') : "-";
                            }
                        },
                        {
                            field: 'scanTime', title: '扫描日期', align: 'center', fixedLeft: true,tips: true,
                            formatter: function (value, row, index) {
                                /* 0未确认；1已确认； */
                                return value != null ?  new Date(value).Format('yyyy-MM-dd hh:mm:ss') : "-";
                            }
                        }

                    ]
                });
            });
        }
    });
})();
