/**
 * Created by Administrator on 2017/12/25.
 */
/**
 * Created by Administrator on 2017/12/12.
 */
import $ from 'jQuery';

(function () {
    let orderData = JSON.parse(IOT.getSessionStore(URI.RENT.TRACKING.DETAIL.BIND.PAGE));
    let $vue = new Vue({
        el: '.bind-order-hook',
        data:{
        },
        methods: {
            cancleBack: function () {
                M.Page.emitPrePage();
                M.Page.emitRefreshPage();
            },
            Bind:function(){
                let scanResult =  $('.choose-bind-order-table-hook').bootstrapTable('getSelections');
                if(scanResult.length == 0){
                    layer.alert('请选择一条数据');
                    return;
                }else{
                    let params ={
                        scanResult,
                        orderNo:orderData.id
                    }
                    IOT.showOverlay('保存中，请稍等...');
                    IOT.getServerData(URI.RENT.TRACKING.DETAIL.BIND.SUBMIT, params, (ret) => {
                        IOT.tips(ret.msg || '操作失败，请重试！', 'error', 1000, null);
                        IOT.hideOverlay();
                        if (ret && ret.code === 200) {
                            IOT.tips('保存成功！', 'success');
                            layer.closeAll();
                            M.Table.refresh.all();
                            M.Page.refreshPage();

                        } else {
                            IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                        }
                    });
                }
            }
        },
        created:function(){
        },
        mounted: function () {
            this.$nextTick(() => {
                var $accountBox = $('.bind-order-hook');
                let tableHookName = '.choose-bind-order-table-hook';
                var $form = $accountBox.find('.form-search-hook');
                modal.initDate("orderStartTime","orderEndTime");
                // 查询
                $accountBox.find('.search-hook').on('click', function () {
                    $(tableHookName).bootstrapTable('onCustomSearch');
                });
                $('.search-hook').on('click', function () {
                    $(tableHookName).bootstrapTable('onCustomSearch');
                });
                var $tableHook =  $accountBox.find(tableHookName).bootstrapTable({
                    scrollbar: 'choose-bind-order-table-hook-body',
                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端*/
                    method: 'post',
                    //   url: URI.RENT.INVENTORY.LIST,
                    url: URI.RENT.TRACKING.DETAIL.BIND.LIST,
                    debug: false,
                    cache: false,
                    pageNumber: 1,
                    pageSize: 10,
                    // fixedColumns: true,
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
                            field: '', checkbox: true, align: 'center', fixedLeft: true, width: 60,
                        },
                        {
                            field: 'no', title: '序号', align: 'center', width: 50,
                            formatter: function (val, rowData, index) {
                                return index + 1;
                            }
                        },
                        {
                            field: 'palletCount', title: '录入托盘总数', align: 'center', fixedLeft: true,width:170,tips: true,
                        },
                        {
                            field: 'uploadUserId', title: '上传账户', align: 'center', fixedLeft: true,width:170
                        },
                        {
                            field: 'deviceType', title: '设备类型', align: 'center', fixedLeft: true,width:170,tips: true,
                        },
                        {
                            field: 'scanType', title: '扫描类型', align: 'center', fixedLeft: true,width:170,
                           /* formatter: function (value, row, index) {
                                if (value === 0 ){return "出库";}
                                else if (value === 1 ){return "入库";}
                                else if (value === 2 ){return "盘点";}
                                else if (value === 3 ){return "报损";}
                            }*/
                        },
                        {
                            field: 'createTime', title: '扫描录入日期', align: 'center', fixedLeft: true,width:170,tips: true,
                            formatter: function (value, row, index) {
                                /* 0未确认；1已确认； */
                                return value != null ?  new Date(value).Format('yyyy-MM-dd hh:mm:ss') : "-";
                            }
                        },
                        {
                            field: 'operate', title: '操作', align: 'center', fixedLeft: true, width: 100,
                            events: {
                                'click .detail-sublet': function (e, value, rowData, index) {
                                    M.Page.emit(URI.RENT.TRACKING.DETAIL.BIND.INFO);
                                    IOT.setSessionStore(URI.RENT.TRACKING.DETAIL.BIND.INFO, JSON.stringify(rowData));
                                    return false;
                                }
                            },
                            formatter: function (value, row, index) {
                                return `<a class="detail-sublet">明细</a>`;
                            }
                        }

                    ]
                });
            });
        }
    });
})();
