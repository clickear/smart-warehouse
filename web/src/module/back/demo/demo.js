import $ from 'jQuery';

require('../../../less/back/demo/demo.less');

$(function () {
    console.log('........')
    var $box = $('.demo-hook');
    let tableHookName = '.demo-table-hook';
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
        url: '/back/demo/list',
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
                field: '', checkbox: true, align: 'center', fixedLeft: true, width: 60,
               /* events: {
                    'change .checkbox-hook': function (e, value, row, index) {
                        console.log('复选框: ' + value);
                    }
                }*/
            },
            {
                field: 'count', title: '托盘总数', align: 'center', fixedLeft: true
            },
            {
                field: 'address', title: '地址', align: 'center', fixedLeft: true
            },
            {
                field: 'datetime', title: '送货时间', align: 'center', fixedLeft: true
            },
            {
                field: 'money', title: '金额预估（¥）', align: 'center', fixedLeft: true,
                formatter: function (val, row, index) {
                    return `${val} ¥`;
                }
            },
            {
                field: 'operate', title: '操作', align: 'center', fixedLeft: true, width: 100,
                events: {
                    'click .edit-lamp': function (e, value, row, index) {
                        M.Page.emit(URI.STREETLAMP.DEVICE.LAMP_DETAIL_PAGE, row);
                        return false;
                    }
                },
                formatter: function (value, row, index) {
                    return '<a class="edit-lamp">编辑</a>';
                }
            }
        ]
    });
});
