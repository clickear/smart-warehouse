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
            prePage: function () { // 上一页
                M.Page.prePage(this.boxs);
            },
            refreshPage: function () { // 触发刷新页(当前显示的页面)
                M.Page.refreshPage(this.boxs);
            },
            add: function () { // 新增-客户
                M.Page.emit(URI.ORGANIZATION.CLIENT.CREATE.PAGE);
            }
        },
        mounted: function () {
            this.$nextTick(() => {
                let tableHookName = '.client-table-hook';
                var $defaultBox = $('.default-hook');
                var $form = $defaultBox.find('.search-hook');
                // 省市区
                $defaultBox.find('.distpicker-hook').distpicker();
                // 查询
                $form.on('submit', function () {
                    $(tableHookName).bootstrapTable('onCustomSearch');
                    return false;
                });
                var $tableHook = $defaultBox.find(tableHookName).bootstrapTable({
                    scrollbar: 'client-table-body',
                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端
                    method: 'post',
                    url: URI.ORGANIZATION.CLIENT.LIST,
                    debug: false,
                    cache: false,
                    pageNumber: 1,
                    pageSize: 20,
                    // fixedColumns: true,
                    authority: M.Authority.checkAuthority('customer-query'),
                    customButton: '',
                    customQueryParams: function (params) {
                        var queryParams = $.extend({}, params, $form.serializeJson());
                        queryParams.companyType = COMPANY_TYPE.CLIENT;
                        return queryParams;
                    },
                    onLoadSuccess: function (data) {
                        // console.log(JSON.stringify(data));
                    },
                    onLoadError: function (status, xhr) {
                    },
                    onCheckAll: function (rows) {

                    },
                    columns: [
                        {
                            field: 'no', title: '序号', align: 'center', width: 50,
                            formatter: function (val, row, index) {
                                return index + 1;
                            }
                        },
                        {
                            field: 'companyName', title: '客户名称', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'linkmanAddress', title: '地址', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'linkmanPhone', title: '电话', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'artificialPersonName', title: '法人姓名', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'createTime', title: '注册时间', align: 'center'
                        },
                        {
                            field: 'operate', title: '操作', align: 'center', fixedLeft: true, width: 160,
                            events: {
                                'click .detail': function (e, value, row, index) {
                                    M.Page.emit(URI.ORGANIZATION.CLIENT.DETAIL.PAGE);
                                    IOT.setSessionStore(URI.ORGANIZATION.CLIENT.DETAIL.PAGE, JSON.stringify(row));
                                    return false;
                                },
                                'click .edit': function (e, value, row, index) {
                                    M.Page.emit(URI.ORGANIZATION.CLIENT.MODIFY.PAGE);
                                    IOT.setSessionStore(URI.ORGANIZATION.CLIENT.MODIFY.PAGE, JSON.stringify(row));
                                    return false;
                                },
                                'click .storage': function (e, value, row, index) {
                                    M.Page.emit(URI.ORGANIZATION.CLIENT.STORAGE.PAGE);
                                    IOT.setSessionStore(URI.ORGANIZATION.CLIENT.STORAGE.PAGE, JSON.stringify(row));
                                    return false;
                                }
                            },
                            formatter: function (value, row, index) {
                                let operate = [];
                                if (M.Authority.checkAuthority('customer-detail')) {
                                    operate.push('<a class="detail">查看</a> ');
                                }
                                if (M.Authority.checkAuthority('customer-modify')) {
                                    operate.push(' <a class="edit">编辑</a>');
                                }
                                if (M.Authority.checkAuthority('customer-storage-point')) {
                                    operate.push(' <a class="storage">仓储点管理</a>');
                                }
                                return  operate.join(' ');
                            }
                        }
                    ]
                });
                // 查看
                if (!M.Authority.checkAuthority('customer-detail') && !M.Authority.checkAuthority('customer-modify')&& !M.Authority.checkAuthority('customer-storage-point')) {
                    $(tableHookName).bootstrapTable('hideColumn', 'operate'); // 隐藏列
                }
            });
        }
    });
})();





















