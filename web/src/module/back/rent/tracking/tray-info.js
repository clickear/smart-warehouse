require('../../../../less/back/rent/rent.less');
import $ from 'jQuery';
(function () {
    let orderData = JSON.parse(IOT.getSessionStore(URI.RENT.TRACKING.TRAY_INFO.PAGE));
    let $vue = new Vue({
        el: '.tray-info-hook',
        data: {
           
        },
        methods: {
            cancleBack: function () {
                M.Page.emitPrePage();
            },
        },
        mounted: function () {
            this.$nextTick(() => {
                var $accountBox = $('.tray-info-table-hook');
                let $form = $('.form-search-tray-info');
                // 查询
                $('.search-hook').on('click', function () {
                    $($accountBox).bootstrapTable('onCustomSearch');
                });
                var $tableHook = $accountBox.bootstrapTable({
                    scrollbar: 'tray-info-table-body',
                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端
                    method: 'post',
                    url: URI.RENT.TRACKING.TRAY_INFO.LIST,
                    debug: false,
                    cache: false,
                    pageNumber: 1,
                    pageSize: 20,
                    // fixedColumns: true,
                    customButton: '',
                    customQueryParams: function (params) {
                        let formParams = $form.serializeJson();
                        formParams.transportBillNo = orderData.transportBillNo;
                        let queryParams = $.extend({}, params, formParams);
                        return queryParams;
                    },
                    columns: [
                        {
                            field: 'no', title: '序号', align: 'center', width: 50,
                            formatter: function (val, rowData, index) {
                                return index + 1;
                            }
                        },
                        {
                            field: 'deviceId', title: '托盘ID', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'wasteStatus', title: '功耗状态', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'businessStatus', title: '业务状态', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'dumpEnergy', title: '剩余电量', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'activeTime', title: '激活日期', align: 'center', fixedLeft: true,
                            formatter: function (value, row, index) {
                                if ((!value)&&(value!=0)){
                                    return '-';
                                }else{
                                    return new Date(value).Format('yyyy-MM-dd hh:mm:ss');
                                }
                            }
                        },
                        {
                            field: 'operate', title: '操作', align: 'center', fixedLeft: true, width: 250,
                            events: {
                                'click .location-timely': function (e, value, row, index) {
                                    M.Page.emit(URI.RENT.TRACKING.TRAY_INFO.TIMELY_LOCATION.PAGE, row);
                                    IOT.setSessionStore(URI.RENT.TRACKING.TRAY_INFO.TIMELY_LOCATION.PAGE, JSON.stringify(row));
                                    return false;
                                }
                            },
                            formatter: function (value, row, index) {
                                return '<a class="location-timely">实时位置</a>';
                            }
                        }
                    ]
                });
            });
        }
    });
})();