/**
 * Created by Administrator on 2017/10/11.
 */
require('../../../../less/back/rent/rent_detail.less');
import $ from 'jQuery';
(function () {
    let $vue = new Vue({
        el: '.detail-result-allocation-hook',
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
            }
        },
        methods: {
            cancleBack: function () {
                M.Page.emitPrePage();
                // M.Page.emitRefreshPage();
            },
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
                let tableHookName = '.detail-result-allocation-table-hook';
                let $form = $('.fomr-search-return');
                // 查询
                $('.search-hook').on('click', function () {
                    $(tableHookName).bootstrapTable('onCustomSearch');
                });
                var $tableHook = $accountBox.find(tableHookName).bootstrapTable({
                    scrollbar: 'detail-result-allocation-table-body',
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
                            field: 'no', title: '序号', align: 'center', width: 50,
                            formatter: function (val, rowData, index) {
                                return index + 1;
                            }
                        },
                        {
                            field: 'orderNo', title: '托盘ID', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'count', title: '激活日期', align: 'center', fixedLeft: true,formatter: function (value, row, index) {
                            return parseInt((row.leaseEndDate - row.leaseStartDate) / 24 / 60 / 60 / 1000);
                        }
                        },
                        {
                            field: 'count', title: '报损日期', align: 'center', fixedLeft: true
                        },

                    ]
                });
            });
        }
    });
})();
