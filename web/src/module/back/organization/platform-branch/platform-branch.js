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
            emitPage: function (){
                M.Page.load(this.boxs);
            },
            prePage: function (){//上一页
                M.Page.prePage(this.boxs);
            },
            refreshPage: function (){//触发刷新页(当前显示的页面)
                M.Page.refreshPage(this.boxs);
            },
            add: function (){//新增网点
                M.Page.emit(URI.ORGANIZATION.PLATFORM_BRANCH.CREATE_PLATFORM_BRANCH.PAGE);
            }
        },
        mounted: function () {
            this.$nextTick(() => {
                let tableHookName = '.platform-branch-table-hook';
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
                    scrollbar: 'platform-branch-table-body',
                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端
                    method: 'post',
                    debug: false,
                    url: URI.ORGANIZATION.PLATFORM_BRANCH.LIST,
                    cache: false,
                    pageNumber: 1,
                    pageSize: 20,
                    // fixedColumns: true,
                    authority: M.Authority.checkAuthority('dot-query'),
                    customButton: '',
                    customQueryParams: function (params) {
                        var formParams = $form.serializeJson();
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
                            field: 'no', title: '序号', align: 'center', fixedLeft: true, width: 50,
                            formatter: function (val, rowData, index) {
                                return index + 1;
                            }
                        },
                        {
                            field: 'storageName', title: '网点名称', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'address', title: '地址', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'phone', title: '电话', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'linkmanName', title: '负责人姓名', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'createTime', title: '注册时间', align: 'center', fixedLeft: true,
                            formatter: function (val, row, index) {
                                return val;
                            }
                        },
                        {
                            field: 'operate', title: '操作', align: 'center', fixedLeft: true, width: 160,
                            events: {
                                'click .detail': function (e, value, row, index) {
                                    M.Page.emit(URI.ORGANIZATION.PLATFORM_BRANCH.DETAIL.PAGE);
                                    IOT.setSessionStore(URI.ORGANIZATION.PLATFORM_BRANCH.DETAIL.PAGE, JSON.stringify(row));
                                    return false;
                                },
                                'click .edit': function (e, value, row, index) {
                                    M.Page.emit(URI.ORGANIZATION.PLATFORM_BRANCH.MODIFY.PAGE);
                                    IOT.setSessionStore(URI.ORGANIZATION.PLATFORM_BRANCH.MODIFY.PAGE, JSON.stringify(row));
                                    return false;
                                }
                            },
                            formatter: function (value, row, index) {
                                let operate = [];
                                //if (M.Authority.checkAuthority('dot-detail')) {
                                    operate.push('<a class="detail">查看&nbsp;&nbsp;</a> ');
                                //}
                                //if (M.Authority.checkAuthority('dot-modify')) {
                                    operate.push(' <a class="edit">&nbsp;&nbsp;编辑</a>');
                                //}
                                return operate.join(' ');
                            }
                        }
                    ]
                });
                // 查看
                if (!M.Authority.checkAuthority('dot-detail') && !M.Authority.checkAuthority('dot-modify')) {
                    $(tableHookName).bootstrapTable('hideColumn', 'operate'); // 隐藏列
                }
            });
        }
    });
})();