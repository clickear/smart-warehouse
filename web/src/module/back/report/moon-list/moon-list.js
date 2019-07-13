import $ from 'jQuery';
(function () {
    let $vue = new Vue({
        el: '.main-hook',
        data: {

            typeItems:[{text:'全部',value:''}],
            wareItems:[{text:'全部',value:''}],
            keywords:'',
            wareidint:'',
            goodstypecodevch:'',

            boxs: {
                box1: {show: true, hook: '.box1-hook', lock: true, url: '/back/report/moonList/page', params: {}},
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

            clearType:function(){

                $vue.$data.goodstypecodevch = '';

            },



        },
        created: function () {
            //获取产品种类信息
            IOT.getServerData(URI.BASE.TYPE.LIST,{},(ret) => {
                if (ret.code === 200) {
                    var  list = ret.rows;

                    $.each(list,function(i,v){
                        $vue.$data.typeItems.push({text:v.itemTypeName,value:v.itemTypeCode})
                    });
                } else {
                    IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                }
            });


        },
        mounted: function () {
            this.$nextTick(() => {
          
                var $accountBox = $('.report-detail-hook');


                let tableHookName = '.report-detail-table-hook';
                $accountBox.find('input[name=workstarttime]').datetimepicker({
                    width: '320px',
                    format: 'Y-m-d',
                    formatDate: 'Y-m-d',
                    scrollMonth: false,
                    scrollTime: false,
                    scrollInput: false,
                    timepicker: false // 关闭时间选项
                });
                $accountBox.find('input[name=workendtime]').datetimepicker({
                    width: '320px',
                    format: 'Y-m-d H',
                    formatDate: 'Y-m-d H',
                    scrollMonth: false,
                    scrollTime: true,
                    scrollInput: false,
                    timepicker: true // 关闭时间选项
                });

                // 查询
                $accountBox.find('.search-hook').on('click', function () {
                    $(tableHookName).bootstrapTable('onCustomSearch');
                });
                $('.search-hook').on('click', function () {
                    $(tableHookName).bootstrapTable('onCustomSearch');
                });
                var $form = $accountBox.find('.form-search-hook');


                var $tableHook = $accountBox.find(tableHookName).bootstrapTable({
                    scrollbar: 'inventory-table-body',
                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端
                    method: 'post',
                    url: URI.REPORT.REPORT_DAY.LIST,
                    debug: false,
                    cache: false,
                    pageNumber: 1,
                    pageSize: 20,
                    // fixedColumns: true,
                    customButton: '',

                    customQueryParams: function (params) {
                        var wareCode = IOT.getLocalStore("backWare");
                        var itemMasterId = IOT.getLocalStore("itemMasterId");
                        var formParams = $form.serializeJson();
                        var queryParams = $.extend({wareCode:wareCode,itemMasterId:itemMasterId,reportType:2}, params, formParams);
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
                            field: 'itemName', title: '物料名称', align: 'center', fixedLeft: true, tips:true,width:320,
                        },
                        {
                            field: 'itemClass', title: '规格', align: 'center', fixedLeft: true, tips:true,width:200,
                        },
                        {
                            field: 'startInventory', title: '开始库存', align: 'center', fixedLeft: true, tips:true,width:100,
                        },
                        {
                            field: 'inInventory', title: '入库数量', align: 'center', fixedLeft: true, tips:true,width:100,
                        },
                        {
                            field: 'outInventory', title: '出库数量', align: 'center', fixedLeft: true, tips:true,width:100,
                        },
                        {
                            field: 'inventory', title: '结束库存', align: 'center', fixedLeft: true, tips:true,width:80,
                        },
                        {
                            field: 'lossInventory', title: '损益量', align: 'center', fixedLeft: true, tips:true,width:80,
                        },
                        {
                            field: 'unitName', title: '单位', align: 'center', fixedLeft: true, tips:true,width:80,
                        },

                        {
                            field: 'startTime', title: '统计开始时间', align: 'center', fixedLeft: true, tips:true
                        },
                        {
                            field: 'endTime', title: '统计结束时间', align: 'center', fixedLeft: true, tips:true
                        },




                    ],



                });

            });
        }
    });
})();