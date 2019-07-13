import $ from 'jQuery';

(function () {
    const tableHookName = '.investor-table-hook';
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
            add: function () { // 新增-投资商
                M.Page.emit(URI.ORGANIZATION.INVESTOR.CREATE.PAGE);
            }
        },
        mounted: function () {
            this.$nextTick(() => {
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
                    scrollbar: 'supplier-table-body',
                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端
                    method: 'post',
                    url: URI.ORGANIZATION.INVESTOR.LIST,
                    debug: false,
                    cache: false,
                    pageNumber: 1,
                    pageSize: 20,
                    // fixedColumns: true,
                    customButton: '',
                    customQueryParams: function (params) {
                        var formParams = $form.serializeJson();
                        var queryParams = $.extend({}, params, formParams);
                        queryParams.companyType = COMPANY_TYPE.INVESTOR;
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
                            field: 'companyName', title: '投资商名称', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'linkmanAddress', title: '地址', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'linkmanPhone', title: '电话', align: 'center', fixedLeft: true
                        },
                        // {
                        //     field: 'supplyCapability', title: '供应能力(周)', align: 'center', fixedLeft: true
                        // },
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
                                    M.Page.emit(URI.ORGANIZATION.INVESTOR.DETAIL.PAGE);
                                    IOT.setSessionStore(URI.ORGANIZATION.INVESTOR.DETAIL.PAGE, JSON.stringify(row));
                                    return false;
                                },
                                'click .edit': function (e, value, row, index) {
                                    M.Page.emit(URI.ORGANIZATION.INVESTOR.MODIFY.PAGE);
                                    IOT.setSessionStore(URI.ORGANIZATION.INVESTOR.MODIFY.PAGE, JSON.stringify(row));
                                    return false;
                                }
                            },
                            formatter: function (value, row, index) {
                                return `<a class="detail">查看</a>
                                        <a class="edit">编辑</a>`;
                            }
                        }
                    ]
                });
            });
        }
    });
})();





















