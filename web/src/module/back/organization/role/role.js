import $ from 'jQuery';

(function () {
    let roleId = $('.role-hook').find('.role-id-hook').val();
    /**
     * 查看或者编辑角色
     * @param action 动作. query:查看；modify:编辑
     * @param data
     * @private
     */
    let _queryOrModifyRole = function (action, data) {
        M.Page.emit(URI.ORGANIZATION.ROLE.MODIFY.PAGE);
        data.action = action;
        IOT.setSessionStore(URI.ORGANIZATION.ROLE.MODIFY.PAGE, JSON.stringify(data));
    };
    let $vue = new Vue({
        el: '.main-hook',
        data: {
            roleRankList: [
                {id: 1, name: '一级'},
                {id: 2, name: '二级'}
            ],
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
            searchTable: function () { // 查询
                $('.role-table-hook').bootstrapTable('onCustomSearch');
            },
            addRole: function () { // 新增角色
                M.Page.emit(URI.ORGANIZATION.ROLE.CREATE.PAGE);
            }
        },
        mounted: function () {
            this.$nextTick(() => {
                let $roleBox = $('.role-hook');
                let $form = $roleBox.find('.form-hook');
                let tableHookName = '.role-table-hook';
                var $tableHook = $roleBox.find(tableHookName).bootstrapTable({
                    // scrollbar: 'role-table-body',
                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端
                    method: 'post',
                    // url: '/back/demo/list',
                    url: URI.ORGANIZATION.ROLE.LIST,
                    debug: false,
                    cache: false,
                    pageNumber: 1,
                    pageSize: 20,
                    // fixedColumns: true,
                    authority: M.Authority.checkAuthority('role-query'),
                    customButton: '',
                    customQueryParams: function (params) {
                        var formParams = $form.serializeJson();
                        var queryParams = $.extend({}, params, formParams);
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
                            formatter: function (val, row, index) {
                                return index + 1;
                            }
                        },
                        {
                            field: 'roleName', title: '角色名称', align: 'center'
                        },
                        {
                            field: 'roleLevel', title: '角色级别', align: 'center'
                        },
                        {
                            field: 'parentRoleId', title: '上级角色ID', align: 'center',
                            formatter: function (value, row, index) {
                                return row.roleLevel === 1 ? '--' : value;
                            }
                        },
                        {
                            field: 'roleDescribe', title: '角色描述', align: 'center'
                        },
                        {
                            field: 'companyName', title: '所属机构', align: 'center',
                            formatter: function (value, row, index) {
                                return row.roleLevel === 1 ? '--' : value;
                            }
                        },
                        {
                            field: 'createTime', title: '创建时间', align: 'center'
                        },
                        {
                            field: 'operate', title: '操作', align: 'center', width: 160,
                            events: {
                                'click .detail-role': function (e, value, rowData, index) {
                                    _queryOrModifyRole('query', rowData);
                                    return false;
                                },
                                'click .modify-role': function (e, value, rowData, index) {
                                    _queryOrModifyRole('modify', rowData);
                                    return false;
                                }
                            },
                            formatter: function (value, row, index) {
                                let operate = [];
                                if (M.Authority.checkAuthority('role-detail')) {
                                    operate.push('<a class="detail-role">查看</a> ');
                                }
                                if (M.Authority.checkAuthority('role-modify')) {
                                    roleId != row.roleId && operate.push(' <a class="modify-role">编辑</a>');
                                }
                                return  operate.join(' ');
                            }
                        }
                    ]
                });
                // 查看
                if (!M.Authority.checkAuthority('role-detail') && !M.Authority.checkAuthority('role-modify')) {
                    $(tableHookName).bootstrapTable('hideColumn', 'operate'); // 隐藏列
                }
            });
        }
    });
})();





















