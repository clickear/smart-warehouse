import $ from 'jQuery';
import URI from 'URI';
$(function () {
    let deviceId = IOT.getSessionStore(URI.ASSET.LIFECYCLE.DETAIL.MAP.PAGE);
    let $vue = new Vue({
        el: '.lifecycle-all-reported-record-hook',
        data: {
            durationType: [{id: 1, name: '库存'}, {id: 2, name: '已租'}, {id: 3, name: '已售'}],
            lifecycleType: [{name: '全部'}, {name: '超期'}, {name: '正常'}],
        },
        methods: {
            goBack: function () {
                M.Page.emitPrePage();
            },
            searchTable: function () {
                $('.lifecycle-all-reported-record-table-hook').bootstrapTable('onCustomSearch');
            }
        },
        mounted: function () {
            this.$nextTick(() => {
                var $defaultHook = $('.lifecycle-all-reported-record-hook');
                // 初始化时间控件
                $defaultHook.find('input[name=activateStartTime]').datetimepicker({
                    width: '320px',
                    format: 'Y-m-d',
                    formatDate: 'Y-m-d',
                    scrollMonth: false,
                    scrollTime: false,
                    scrollInput: false,
                    onShow: function (ct) {
                        this.setOptions({
                            minDate: '1970/01/01',
                            maxDate: new Date()
                        });
                    },
                    // onChangeDateTime: function (dateText, inst) {
                    //     $vue.$data.info.establishDate = new Date(dateText).Format('yyyy-MM-dd');
                    // },
                    timepicker: false // 关闭时间选项
                });
                $defaultHook.find('input[name=activateEndTime]').datetimepicker({
                    width: '320px',
                    format: 'Y-m-d',
                    formatDate: 'Y-m-d',
                    scrollMonth: false,
                    scrollTime: false,
                    scrollInput: false,
                    onShow: function (ct) {
                        this.setOptions({
                            minDate: '1970/01/01',
                            maxDate: new Date()
                        });
                    },
                    timepicker: false // 关闭时间选项
                });
                let tableHookName = '.lifecycle-all-reported-record-table-hook';
                var $form = $defaultHook.find('.form-hook');
                // 省市区
                $defaultHook.find('.distpicker-hook').distpicker();
                // 查询
                $form.on('submit', function () {
                    $(tableHookName).bootstrapTable('onCustomSearch');
                    return false;
                });
                var $tableHook = $defaultHook.find(tableHookName).bootstrapTable({
                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端
                    method: 'post',
                    url: URI.ASSET.LIFECYCLE.DETAIL.ALL_REPORTED_RECORD.LIST,
                    debug: false,
                    cache: false,
                    pageNumber: 1,
                    pageSize: 20,
                    // fixedColumns: true,
                    customButton: '',
                    customQueryParams: function (params) {
                        params.deviceId = deviceId;
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
                            field: 'num', title: '序号', align: 'center', fixedLeft: true,width: 50,
                            formatter: function (value, row, index) {
                                return index + 1;
                            }
                        },
                        {
                            field: 'userData', title: '上报RFID信息', align: 'center', fixedLeft: true,
                        },
                        {
                            field: 'lac', title: '基站信息', align: 'center', fixedLeft: true, width: 85,
                        },
                        {
                            field: 'voltage', title: '终端电压', align: 'center', fixedLeft: true, tips: true
                        },
                        {
                            field: 'signalLevel', title: '信号强度', align: 'center', fixedLeft: true, tips: 'field'
                        },
                        {
                            field: 'lowVoltageAlarm', title: '低电压告警', align: 'center', fixedLeft: true,
                            formatter: function (value, row, index) {
                                return value === false ? '否': '是';
                            }
                        },
                        {
                            field: 'chipInfoTime', title: '运行时间', align: 'center', fixedLeft: true, tips: true,
                        },
                        {
                            field: 'hourLong', title: '本次工作时长', align: 'center', fixedLeft: true, tips: true,
                        },
                        {
                            field: 'uploadTime', title: '上报时间', align: 'center', fixedLeft: true, tips: true,
                            formatter: function (val, row, index) {
                                return `${val}`;
                            }
                        },
                        {
                            field: 'operate', title: '操作', align: 'center', fixedLeft: true, width: 100,
                            events: {
                                'click .custom-edit': function (e, value, row, index) {
                                    M.Page.emit(URI.ASSET.LIFECYCLE.DETAIL.SINGLE_REPORTED_RECORD.PAGE);
                                    IOT.setSessionStore(URI.ASSET.LIFECYCLE.DETAIL.SINGLE_REPORTED_RECORD.PAGE, row.historyPositionId);
                                    return false;
                                }
                            },
                            formatter: function (value, row, index) {
                                return '<a class="custom-edit">详情</a>';
                            }
                        }
                    ]
                });
            });
        }
    });
});
