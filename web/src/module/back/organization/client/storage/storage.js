import $ from 'jQuery';

(function () {
    let storeParams = JSON.parse(IOT.getSessionStore(URI.ORGANIZATION.CLIENT.STORAGE.PAGE));
    const EL = '.storage-hook';
    const tableHookName = '.storage-table-hook';

    /**
     * 删除-仓储点
     * @param params
     * @private
     */
    var _deleteStorage = function (params) {
        IOT.confirm('你确定要删除吗？', () => {
            IOT.showOverlay('保存中，请稍等...');
            IOT.getServerData(URI.ORGANIZATION.CLIENT.STORAGE.DELETE, params, function (ret) {
                IOT.hideOverlay();
                M.Table.refresh.storage();
                if (ret && ret.code === 200) {
                    IOT.tips('删除成功！', 'success');
                    BootstrapDialog.closeAll();
                } else {
                    IOT.tips(ret.msg || '操作失败，请重试！', 'error');
                }
            });
            return false;
        }, null, 'warn');
    };

    let $vue = new Vue({
        el: EL,
        data: {},
        methods: {
            goBack: function () {
                M.Page.emitPrePage();
            },
            add: function () { // 新增-仓储点
                M.Page.emit(URI.ORGANIZATION.CLIENT.STORAGE.CREATE.PAGE);
                IOT.setSessionStore(URI.ORGANIZATION.CLIENT.STORAGE.CREATE.PAGE, JSON.stringify(storeParams));
            }
        },
        mounted: function () {
            this.$nextTick(() => {
                let $storageBox = $(EL);
                $storageBox.find('.province-hook,.city-hook,.county-hook').selectpicker({width: '120px'});
                let $form = $storageBox.find('.search-hook');
                let $tableHook = $storageBox.find(tableHookName).bootstrapTable({
                    scrollbar: 'storage-table-body',
                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端
                    method: 'post',
                    url: URI.ORGANIZATION.CLIENT.STORAGE.LIST,
                    debug: false,
                    cache: false,
                    pageNumber: 1,
                    pageSize: 20,
                    // fixedColumns: true,
                    authority: M.Authority.checkAuthority('customer-storage-point-query'),
                    customButton: '',
                    customQueryParams: function (params) {
                        var formParams = $form.serializeJson();
                        var queryParams = $.extend({}, params, formParams);
                        queryParams.companyId = storeParams.companyId;
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
                            formatter: function (val, row, index) {
                                return index + 1;
                            }
                        },
                        {
                            field: 'storageName', title: '仓储点名称', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'address', title: '仓储点地址', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'phone', title: '仓储点电话', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'linkmanName', title: '仓储点联系人', align: 'center', fixedLeft: true
                        },
                        // {
                        //     field: 'lng', title: '经纬度坐标', align: 'center', fixedLeft: true,
                        //     formatter: function (val, row, index) {
                        //         console.log(row);
                        //         return `${row.lng},${row.lat}`;
                        //     }
                        // },
                        {
                            field: 'operate', title: '操作', align: 'center', fixedLeft: true, width: 160,
                            events: {
                                'click .detail': function (e, value, row, index) {
                                    M.Page.emit(URI.ORGANIZATION.CLIENT.STORAGE.DETAIL.PAGE);
                                    IOT.setSessionStore(URI.ORGANIZATION.CLIENT.STORAGE.DETAIL.PAGE, JSON.stringify(row));
                                    return false;
                                },
                                'click .edit': function (e, value, row, index) {
                                    M.Page.emit(URI.ORGANIZATION.CLIENT.STORAGE.MODIFY.PAGE);
                                    IOT.setSessionStore(URI.ORGANIZATION.CLIENT.STORAGE.MODIFY.PAGE, JSON.stringify(row));
                                    return false;
                                },
                                'click .delete': function (e, value, row, index) {
                                    _deleteStorage(row);
                                    return false;
                                }
                            },
                            formatter: function (value, row, index) {
                                let operate = [];
                                if (M.Authority.checkAuthority('customer-storage-point-detail')) {
                                    operate.push('<a class="detail">查看</a> ');
                                }
                                if (M.Authority.checkAuthority('customer-storage-point-modify')) {
                                    operate.push(' <a class="edit">编辑</a>');
                                }
                                if (M.Authority.checkAuthority('customer-storage-point-delete')) {
                                    operate.push(' <a class="delete">删除</a>');
                                }
                                return  operate.join(' ');
                            }
                        }
                    ]
                });
                // 查看
                if (!M.Authority.checkAuthority('customer-storage-point-detail') && !M.Authority.checkAuthority('customer-storage-point-modify')&& !M.Authority.checkAuthority('customer-storage-point-delete')) {
                    $(tableHookName).bootstrapTable('hideColumn', 'operate'); // 隐藏列
                }
            });
        }
    });
})();





















