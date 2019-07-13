require('../../../../less/back/rent/rent_detail.less');
import $ from 'jQuery';
(function () {
    let orderData = JSON.parse(IOT.getSessionStore(URI.RENT.SCAN_RESULTS.DETAIL.BIND.PAGE));
    let $vue = null;
    $vue = new Vue({
        el: '.ScanBind-hook',
        data: {
            billType: [{id: 1, name: '调拨运单'}, {id:2, name: '流转运单'}],
            info:orderData
        },
        methods: {
            //取消按钮
            cancleBack: function () {
                M.Page.emitPrePage();
            },
            //绑定按钮
            scanBind: function () {
                let selectContent =  $('.ScanBind-table-hook').bootstrapTable('getSelections')[0];
                if(typeof(selectContent) == 'undefined'){
                    layer.alert('请选择一条数据');
                    return false;
                }else{
                    let params ={
                        scanResultId:orderData.scanResultId,//扫描结果ID
                        orderNo:selectContent.transportBillNo//运单编号
                    };
                    layer.confirm(' &nbsp;&nbsp; &nbsp;&nbsp;是否确认绑定？', {
                        btn: ['确定','取消']
                    }, function(){
                        IOT.showOverlay('保存中，请稍等...');
                        IOT.getServerData(URI.RENT.SCAN_RESULTS.DETAIL.BIND.BIND, params, (ret) => {
                            IOT.tips(ret.msg || '操作失败，请重试！', 'error', 1000, null);
                            IOT.hideOverlay();
                            if (ret && ret.code === 200) {
                                IOT.tips('绑定成功！', 'success');
                                layer.closeAll();
                                M.Table.refresh.all();
                                M.Page.emitPrePage();
                                M.Page.emitPrePage();
                            } else {
                                IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                            }
                        });
                    }, function(){
                        //取消
                    });
                }
            }
        },
        mounted: function () {
            this.$nextTick(() => {
                var $accountBox = $('.ScanBind-hook');
                //初始化时间插件
                modal.initDate("bind-startdate","bind-enddate");
                let tableHookName = '.ScanBind-table-hook';
                // 查询
                $accountBox.find('.search-hook').on('click', function () {
                 $(tableHookName).bootstrapTable('onCustomSearch');
                 });
                 var $form = $accountBox.find('.form-search-hook');
                 var $tableHook = $accountBox.find(tableHookName).bootstrapTable({
                    scrollbar: 'ScanBind-table-body',
                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端
                    method: 'post',
                    url: URI.RENT.SCAN_RESULTS.DETAIL.BIND.LIST,
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
                        /*{
                            field: 'no', title: '序号', align: 'center', width: 50,
                            formatter: function (val, rowData, index) {
                                return index + 1;
                            }
                        },*/
                        {
                            field: '', radio: true, align: 'center', fixedLeft: true, width: 60,
                            events: {
                                'change .radio-hook': function (e, value, row, index) {
                                }
                            }
                        },
                        {
                            field: 'transportBillNo', title: '运单ID', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'totalStock', title: '托盘总数', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'supplierCompanyName', title: '供货单位', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'supplierStorageName', title: '供货网点', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'consigneeCompanyName', title: '收货单位', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'consigneeStorageName', title: '收货网点', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'operatorName', title: '操作人', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'createTime', title: '订单日期', align: 'center', fixedLeft: true,
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