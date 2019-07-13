require('../../../../less/back/rent/rent_detail.less');
import $ from 'jQuery';
(function () {
    let orderData = JSON.parse(IOT.getSessionStore(URI.RENT.SCAN_RESULTS.DETAIL.PAGE));
    let $vue = null;
    $vue = new Vue({
        el: '.ScanDetail-hook',
        data: {
            info:orderData
        },
        methods: {
            //返回
            cancleBack: function () {
                M.Page.emitPrePage();
            },
            //解除绑定按钮
            unScanBind: function () {
                let params ={
                    scanResultId:orderData.scanResultId
                };
                layer.confirm(' &nbsp;&nbsp; &nbsp;&nbsp;是否确认解除绑定？', {
                    btn: ['确定','取消']
                }, function(){
                    IOT.showOverlay('保存中，请稍等...');
                    IOT.getServerData(URI.RENT.SCAN_RESULTS.DETAIL.UNBIND, {scanResultId:params.scanResultId}, (ret) => {
                        IOT.tips(ret.msg || '操作失败，请重试！', 'error', 1000, null);
                        IOT.hideOverlay();
                        if (ret && ret.code === 200) {
                            IOT.tips('解除绑定成功！', 'success');
                            layer.closeAll();
                            M.Table.refresh.all();
                            M.Page.emitPrePage();
                        } else {
                            IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                        }
                    });
                }, function(){
                    //取消
                });
            },
            //绑定运单按钮——进入页面
            nextStep:function(){
                M.Page.emit(URI.RENT.SCAN_RESULTS.DETAIL.BIND.PAGE);
                IOT.setSessionStore(URI.RENT.SCAN_RESULTS.DETAIL.BIND.PAGE, JSON.stringify(orderData));
            }
        },
        mounted: function () {
            this.$nextTick(() => {
                var $accountBox = $('.ScanDetail-hook');
                let tableHookName = '.ScanDetail-table-hook';
                // 查询
                /*$accountBox.find('.search-hook').on('click', function () {
                    $(tableHookName).bootstrapTable('onCustomSearch');
                });
                $('.search-hook').on('click', function () {
                    $(tableHookName).bootstrapTable('onCustomSearch');
                });
                var $form = $accountBox.find('.form-search-hook');*/
                var $tableHook = $accountBox.find(tableHookName).bootstrapTable({
                    scrollbar: 'ScanDetail-table-body',
                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端
                    method: 'post',
                    url: URI.RENT.SCAN_RESULTS.DETAIL.LIST,
                    debug: false,
                    cache: false,
                    pageNumber: 1,
                    pageSize: 20,
                    // fixedColumns: true,
                    customButton: '',
                   customQueryParams: function (params) {
                        var formParams = {
                            pageNum:1,
                            pageSize:20,
                            scanResultId:orderData.scanResultId
                        };
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
                            field: '', radio: true, align: 'center', fixedLeft: true, width: 60,
                            events: {
                                'change .radio-hook': function (e, value, row, index) {
                                }
                            }
                        },
                        {
                            field: 'deviceId', title: '托盘ID', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'activeTime', title: '激活日期', align: 'center', fixedLeft: true,
                            formatter: function (value, row, index) {
                                if ((!value)&&(value!=0)){
                                    return '-';
                                }else{
                                    return new Date(value).Format('yyyy-MM-dd hh:mm:ss');
                                }
                            }
                        },
                        {
                            field: 'scanTime', title: '扫描日期', align: 'center', fixedLeft: true,
                            formatter: function (value, row, index) {
                                if ((!value)&&(value!=0)){
                                    return '-';
                                }else{
                                    return new Date(value).Format('yyyy-MM-dd hh:mm:ss');
                                }
                            }
                        },
                        /*{
                            field: 'operate', title: '操作', align: 'center', fixedLeft: true,width:60,
                            events: {
                                'click .detail-return': function (e, value, rowData, index) {
                                    M.Page.emit(URI.RENT.RETURN.DETAIL.PAGE);
                                    IOT.setSessionStore(URI.RENT.RETURN.DETAIL.PAGE, JSON.stringify(rowData));
                                    return false;
                                }
                            },
                            formatter: function (value, row, index) {
                                return `<a class="detail-return">查看</a>`;
                            }
                        }*/
                    ]
                });
                //权限——查看
                if (!M.Authority.checkAuthority('unsubscribe-detail')) {
                    $(tableHookName).bootstrapTable('hideColumn', 'operate');//隐藏列
                }
            });
        }
    });
})();