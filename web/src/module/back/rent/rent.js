import $ from 'jQuery';
$(function () {
    var $box = $('.rent-hook');
    let tableHookName = '.rent-table-hook';
    $('.area-hook').selectpicker({width: '90px'});
    $('.order-status-hook').selectpicker({width: '110px'});
    var $form = $box.find('.search-hook');
    var $tableHook = $box.find(tableHookName).bootstrapTable({
        // el: tableHookName,
        // scrollbar: 'demo-table-body',
        striped: true, // 设置为 true 会有隔行变色效果
        pagination: true, // true 显示分页
        paginationDetail: false, // 分页详情
        sidePagination: 'server', // 服务器端
        method: 'post',
        url: '/back/systemParameter/msg/list',
        debug: true,
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
        onLoadSuccess: function () {
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
                field: 'count', title: '订单ID', align: 'center', fixedLeft: true
            },
            {
                field: 'count', title: '托盘总数', align: 'center', fixedLeft: true
            },
            {
                field: 'count', title: '租赁方式', align: 'center', fixedLeft: true
            },
            {
                field: 'count', title: '租赁类型', align: 'center', fixedLeft: true
            },
            {
                field: 'count', title: '租期', align: 'center', fixedLeft: true
            },
            {
                field: 'count', title: '确认状态', align: 'center', fixedLeft: true
            },
            {
                field: 'count', title: '承租客户', align: 'center', fixedLeft: true
            },
            {
                field: 'count', title: '收货状态', align: 'center', fixedLeft: true
            },
            {
                field: 'count', title: '租赁租金', align: 'center', fixedLeft: true
            },
            {
                field: 'count', title: '保证金', align: 'center', fixedLeft: true
            },
            {
                field: 'address', title: '目的地', align: 'center', fixedLeft: true,width: 180
            },
            {
                field: 'datetime', title: '订单日期', align: 'center', fixedLeft: true,width: 180
            }
        ]
    });
});
