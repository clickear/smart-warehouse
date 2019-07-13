import $ from 'jQuery';

(function () {

    let $vue = new Vue({
        el: '.main-hook',
        data: {
            rowData:[],
            wareItems:[{text:'全部',value:''}],
            boxs: {
                box1: {show: true, hook: '.box1-hook', lock: true, url: '/back/areaItem/page', params: {}},
                box2: {show: false, hook: '.box2-hook', url: '', params: {}},
                box3: {show: false, hook: '.box3-hook', url: '', params: {}},
                box4: {show: false, hook: '.box4-hook', url: '', params: {}}
            },
            items:[{"text":"aaa","value":"bbb"}],

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
            selectBillMaster:function(){

                let tableHookName2 = '.ScanResults2-table-hook';
            },

            commit:function(){

                $("#Modal").modal('hide');
                var areaItem = $vue.$data.rowData;
                var newquantity = areaItem.newquantity;
                areaItem.quantity = newquantity;
                $vue.$data.rowData = [];
                IOT.showOverlay('保存中，请稍等...');
                IOT.getServerData(URI.REPORT.AREA_ITEM.UPDATE,areaItem,(ret) => {
                    IOT.hideOverlay();
                    if (ret.code === 200) {
                        IOT.tips('保存成功！', 'success', 1000 , function () {
                            M.Table.refresh.all();

                        });

                    } else {
                        IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                    }
                });
            }




        },

        created:function(){
            //获取仓库信息
            IOT.getServerData(URI.BASE.WAREHOUSE.LIST,{},(ret) => {
                if (ret.code === 200) {

                    var  rows = ret.rows;
                    $.each(rows,function(i,v){
                        $vue.$data.wareItems.push({text:v.warenamevch,value:v.wareidint})
                    });
                } else {
                    IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                }
            });
        },
        mounted: function () {
            this.$nextTick(() => {
                var $accountBox = $('.ScanResults-hook');



                let tableHookName = '.ScanResults-table-hook';
                let tableHookName2 = '.ScanResults2-table-hook';
                // 查询
                $accountBox.find('.search-hook').on('click', function () {
                    $(tableHookName).bootstrapTable('onCustomSearch');
                });
                var $form = $accountBox.find('.form-search-hook');

                var $tableHook = $accountBox.find(tableHookName).bootstrapTable({
                    scrollbar: 'patchAllocation-table-body',
                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端
                    method: 'post',
                    url:URI.REPORT.AREA_ITEM.LIST,
                    debug: false,
                    cache: false,
                    pageNumber: 1,
                    pageSize: 20,
                    // fixedColumns: true,
                    customButton: '',

                    onClickRow: function (row) {

                    },
                    customQueryParams: function (params) {
                        var wareCode = IOT.getLocalStore("backWare")
                        var formParams = $form.serializeJson();
                        var queryParams = $.extend({wareCode:wareCode}, params, formParams);
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
                            field: 'id', title: 'ID', align: 'center',
                        },
                        {
                            field: 'wareName', title: '仓库', align: 'center',
                        },
                        {
                            field: 'areaName', title: '货区', align: 'center',
                        },
                        {
                            field: 'itemName', title: '物料', align: 'center',
                        },
                        {
                            field: 'itemClass', title: '规格', align: 'center',
                        },

                        {
                            field: 'quantity', title: '数量', align: 'center',
                        },
                        {
                            field: 'operate', title: '操作', align: 'center', fixedLeft: true, width: 160,
                            events: {
                                'click .detail-account': function (e, value,rowData, index) {
                                    $vue.$data.rowData = $.extend({newquantity:''},   rowData);
                                    $("#Modal").modal('show');

                                }
                            },
                            formatter: function (value, row, index) {
                                return `<button style="" class="btn btn-blue detail-account">修改</a>`;
                            }
                        }


                    ],


                });

            });
        }
    });
})();









