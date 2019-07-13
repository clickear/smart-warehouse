import $ from 'jQuery';

(function () {

    let $vue = new Vue({
        el: '.main-hook',
        data: {
            boxs: {
                box1: {show: true, hook: '.box1-hook', lock: true, url: '', params: {}},
                box2: {show: false, hook: '.box2-hook', url: '', params: {}},
                box3: {show: false, hook: '.box3-hook', url: '', params: {}},
                box4: {show: false, hook: '.box4-hook', url: '', params: {}}
            }
        },
        methods: {
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
            },
            // 发布优惠页面
            newRelease: function () {
                M.Page.emit(URI.RUN.PREFERENTIAL_POLICIES.CREATE.PAGE);
                IOT.setSessionStore(URI.RUN.PREFERENTIAL_POLICIES.CREATE.PAGE, JSON.stringify({action: ACTION.CREATE}));
            }
        },
        mounted: function () {
            this.$nextTick(() => {
                let tableHookName = '.preferential-table-hook';
                var $defaultHook = $('.preferential-hook');
                // 查询
                var $form = $defaultHook.find('.form-hook');
                $form.find('input[name=startTime]').datetimepicker({
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
                $form.find('input[name=endTime]').datetimepicker({
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

                // 查询
                $form.off('submit').on('submit', function () {
                    $(tableHookName).bootstrapTable('onCustomSearch');
                    return false;
                });
                var $tableHook = $defaultHook.find(tableHookName).bootstrapTable({
                    scrollbar: 'preferential-table-body',
                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端
                    method: 'post',
                    url: URI.RUN.PREFERENTIAL_POLICIES.LIST,
                    debug: false,
                    cache: false,
                    pageNumber: 1,
                    pageSize: 20,
                    // fixedColumns: true,
                    customButton: '',
                    customQueryParams: function (params) {
                        var formParams = $form.serializeJson();
                        var queryParams = $.extend({}, params, formParams);
                        // console.log(queryParams);
                        return queryParams;
                    },
                    onLoadSuccess: function (data) {
                        // console.log(data);
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
                            field: 'title', title: '标题', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'infoType', title: '类型', align: 'center', fixedLeft: true,
                            formatter: function (val, rowData, index) {
                                return val === 0 ? '租赁优惠' : '用户推广';
                            }
                        },
                        {
                            field: 'isLink', title: '是否外链', align: 'center', fixedLeft: true,
                            formatter: function (val, rowData, index) {
                                return val === 0 ? '否' : '是';
                            }
                        },
                        {
                            field: 'linkUrl', title: '外链地址', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'createUser', title: '发布人', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'createTime', title: '发布时间', align: 'center', fixedLeft: true,
                            formatter: function (val, row, index) {
                                return val;
                            }
                        },
                        {
                            field: 'operate', title: '操作', align: 'center', fixedLeft: true, width: 160,
                            events: {
                                'click .detail': function (e, value, row, index) {
                                    M.Page.emit(URI.RUN.PREFERENTIAL_POLICIES.DELETE.PAGE, row);
                                    IOT.setSessionStore(URI.RUN.PREFERENTIAL_POLICIES.CREATE.PAGE, {action: ACTION.CREATE});
                                    return false;
                                }
                            },
                            events: {
                                'click .modify': function (e, value, row, index) {
                                    M.Page.emit(URI.RUN.PREFERENTIAL_POLICIES.MODIFY.PAGE);
                                    IOT.setSessionStore(URI.RUN.PREFERENTIAL_POLICIES.CREATE.PAGE, JSON.stringify({
                                        action: ACTION.MODIFY,
                                        id: row.id
                                    }));
                                    return false;
                                }
                            },
                            formatter: function (value, row, index) {
                                return `<a class="detail operate" href="discounts/${row.id}" target="_blank">查看</a>
                                        <a class="modify operate">编辑</a>`;
                            }
                        }
                    ]
                });
            });
        }
    });
})();




















