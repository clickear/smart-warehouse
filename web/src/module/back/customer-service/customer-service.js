/**
 * Created by Administrator on 2017/10/11.
 */
import $ from 'jQuery';

(function () {
    let $vue = new Vue({
        el: '.customer-main-hook',
        data: {
            boxs: {
                box1: {show: true, hook: '.box1-hook', lock: true, url: '', params: {}},
                box2: {show: false, hook: '.box2-hook', url: '', params: {}},
                box3: {show: false, hook: '.box3-hook', url: '', params: {}},
                box4: {show: false, hook: '.box4-hook', url: '', params: {}},
                box5: {show: false, hook: '.box4-hook', url: '', params: {}}
            }
        },
        methods: {
            cancleBack: function () {
                M.Page.emitPrePage();
                // M.Page.emitRefreshPage();
            },
            emitPage: function () {
                M.Page.load(this.boxs);
            },
            // 上一页
            prePage: function () {
                M.Page.prePage(this.boxs);
            },
            // 触发刷新页(当前显示的页面)
            refreshPage: function () {
                M.Page.refreshPage(this.boxs);
            }

        },
        mounted: function () {
            this.$nextTick(() => {
                var $accountBox = $('.customer-hook');
                $accountBox.find('.area-hook').selectpicker({width: '120px'});
                $accountBox.find('.customer-status-hook').selectpicker({width: '80px'});
                $accountBox.find('input[name=consultStartTime]').datetimepicker({
                    width: '320px',
                    format: 'Y-m-d',
                    formatDate: 'Y-m-d',
                    scrollMonth: false,
                    scrollTime: false,
                    scrollInput: false,
                    timepicker: false // 关闭时间选项
                });
                $accountBox.find('input[name=consultEndTime]').datetimepicker({
                    width: '320px',
                    format: 'Y-m-d',
                    formatDate: 'Y-m-d',
                    scrollMonth: false,
                    scrollTime: false,
                    scrollInput: false,
                    timepicker: false // 关闭时间选项
                });
                let tableHookName = '.customer-table-hook';
                // 查询
                $accountBox.find('.search-hook').on('click', function () {
                    $(tableHookName).bootstrapTable('onCustomSearch');
                });
                $('.search-hook').on('click', function () {
                    $(tableHookName).bootstrapTable('onCustomSearch');
                });
                var $form = $accountBox.find('.form-hook');
                var $tableHook = $accountBox.find(tableHookName).bootstrapTable({
                    scrollbar: 'customer-table-body',
                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端
                    method: 'post',
                    url:URI.CUSTOMER.LIST,
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
                    onLoadSuccess: function () {
                    },
                    onLoadError: function (status, xhr) {
                    },
                    onCheckAll: function (rows) {

                    },
                    columns: [
                        {
                            field: 'consultId', title:'序号', align: 'center', fixedLeft: true, width: 60,
                            formatter: function (val, rowData, index) {
                                return index + 1;
                            }
                        },
                        {
                            field: 'consultUserMobile', title: '咨询人手机', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'consultUserName', title: '咨询人姓名', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'consultContent', title: '咨询内容', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'reply', title: '状态', align: 'center', fixedLeft: true,
                            formatter: function (value, row, index) {
                                /* 1入库；2出库； */
                                if (value === true ){return "已回复";}
                                else if (value === false ){return "未回复";}
                            }
                        },
                        {
                            field: 'count', title: '登录用户', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'count', title: '电话回复', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'replyUserName', title: '回复人姓名', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'createTime', title: '咨询时间', align: 'center', fixedLeft: true,width: 180,
                            formatter: function (value, row, index) {
                                /* 0未确认；1已确认； */
                                return value != null ?  new Date(value).Format('yyyy-MM-dd hh:mm:ss') : "-";
                            }
                        },
                        {
                            field: 'replyTime', title: '回复时间', align: 'center', fixedLeft: true,width: 180,
                            formatter: function (value, row, index) {
                                /* 0未确认；1已确认； */
                                return value != null ?  new Date(value).Format('yyyy-MM-dd hh:mm:ss') : "-";
                            }
                        },
                        {
                            field: 'operate', title: '操作', align: 'center', fixedLeft: true, width: 300,
                            events: {
                                'click .detail-account': function (e, value, row, index) {
                                    M.Page.emit(URI.CUSTOMER.DETAIL.PAGE);
                                    IOT.setSessionStore(URI.CUSTOMER.DETAIL.PAGE, JSON.stringify(row));
                                    return false;
                                }
                            },
                            formatter: function (value, row, index) {
                                return `<a class="detail-account">查看</a>`;

                            }
                        }

                    ]
                });
            });
        }
    });
})();





















