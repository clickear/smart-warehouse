/**
 * Created by Administrator on 2017/10/11.
 */
import $ from 'jQuery';

(function () {
    let $vue = new Vue({
        el: '.settlement-main-hook',
        data: {
            boxs: {
                box1: {show: true, hook: '.box1-hook', lock: true, url: '', params: {}},
                box2: {show: false, hook: '.box2-hook', url: '', params: {}},
                box3: {show: false, hook: '.box3-hook', url: '', params: {}},
                box4: {show: false, hook: '.box4-hook', url: '', params: {}}
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
                var $accountBox = $('.settlement-hook');
                let tableHookName = '.unread-table-hook';
                $accountBox.find(tableHookName).bootstrapTable('hideColumn', 'id');
                var $tableHook = $accountBox.find(tableHookName).bootstrapTable({
                    scrollbar: 'settlement-table-body',
                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端
                    method: 'post',
                    url: URI.MESSAGEBACKLOG.LIST,
                    debug: false,
                    cache: false,
                    pageNumber: 1,
                    pageSize: 20,
                    // fixedColumns: true,
                    customButton: '',
                    customQueryParams: function (params) {
                      /*  var formParams = $form.serializeJson();*/
                        var formParams={
                            backState:'unread '
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
                            field: 'count', title:'序号', align: 'center', fixedLeft: true, width: 60,
                            formatter: function (val, rowData, index) {
                                return index + 1;
                            }
                        },
                        {
                            field: 'id', align: 'center',visible:false,
                        },
                        {
                            field: 'title', title: '待办事项', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'leaseCustomer', title: '业主方', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'customerName', title: '客户方', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'createTime', title: '通知时间', align: 'center', fixedLeft: true,width: 180
                        },
                        {
                            field: 'operate', title: '操作', align: 'center', fixedLeft: true, width: 300,
                            events: {
                                'click .detail-account': function (e, value, rowData, index) {
                                    M.Page.emit(URI.MESSAGEBACKLOG.DETAIL.PAGE);
                                    IOT.setSessionStore(URI.MESSAGEBACKLOG.DETAIL.PAGE, JSON.stringify(rowData));
                                    IOT.getServerData(URI.MESSAGEBACKLOG.READ, {id: rowData.id}, (ret) => {
                                        if (ret && ret.code === 200) {
                                            M.Table.refresh.all();
                                        } else {
                                            IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                                        }
                                    });
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
            this.$nextTick(() => {
                var $accountBox = $('.settlement-hook');
                let tableHookName = '.already-read-table-hook';
                var $tableHook = $accountBox.find(tableHookName).bootstrapTable({
                    scrollbar: 'settlement-table-body',
                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端
                    method: 'post',
                    url: URI.MESSAGEBACKLOG.LIST,
                    debug: false,
                    cache: false,
                    pageNumber: 1,
                    pageSize: 20,
                    // fixedColumns: true,
                    customButton: '',
                    customQueryParams: function (params) {
                        /*  var formParams = $form.serializeJson();*/
                        var formParams={
                            backState:'read '
                        }
                        var queryParams = $.extend({}, params, formParams);
                        console.log(queryParams);
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
                            field: 'count', title:'序号', align: 'center', fixedLeft: true, width: 60,
                            formatter: function (val, rowData, index) {
                                return index + 1;
                            }
                        },
                        {
                            field: 'title', title: '待办事项', align: 'center', fixedLeft: true,tips:true
                        },
                        {
                            field: 'leaseCustomer', title: '业主方', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'customerName', title: '客户方', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'createTime', title: '通知时间', align: 'center', fixedLeft: true,width: 180
                        },
                        {
                            field: 'operate', title: '操作', align: 'center', fixedLeft: true, width: 300,
                            events: {
                                'click .detail-account': function (e, value, rowData, index) {
                                    M.Page.emit(URI.MESSAGEBACKLOG.DETAIL.PAGE);
                                    IOT.setSessionStore(URI.MESSAGEBACKLOG.DETAIL.PAGE, JSON.stringify(rowData));
                                    return false;
                                }
                            },
                            formatter: function (value, row, index) {
                                return `<a class="detail-account">查看</a>`;
                            }
                        }

                    ]
                });
                }

            )
        }
    });

})();




















