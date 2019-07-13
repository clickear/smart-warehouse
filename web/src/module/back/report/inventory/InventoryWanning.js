import $ from 'jQuery';
require('../../../../../static/lib/bootstrap-table/tableExport');

(function () {
    let $vue = new Vue({
        el: '.inventory-main-hook',
        data: {

            typeItems:[{text:'全部',value:''}],
            wareItems:[{text:'全部',value:''}],
            keyWords:'',
            wareCode:'',
            itemTypeCode:'',
            unitName:'',
            unitCode:'',
            batch:{},

            boxs: {
                box1: {show: true, hook: '.box1-hook', lock: true, url: '/back/inventory/page', params: {}},
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

                $vue.$data.itemTypeCode = '';

            },

         
          




        },
        created: function () {
            //获取产品类型信息
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
                var $accountBox = $('.inventory-hook');
                let tableHookName = '.inventory-table-hook';
                // 查询
                $accountBox.find('.search-hook').on('click', function () {
                    $(tableHookName).bootstrapTable('onCustomSearch');
                });
                $('.search-hook').on('click', function () {
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
                    url: URI.REPORT.INVENTORY.WARNING.LIST,
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
                        var queryParams = $.extend({wareCode:wareCode,itemMasterId:itemMasterId}, params, formParams);
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
                                    field: 'wareName', title: '仓库', align: 'center',
                                },

                                {
                                    field: 'itemName', title: '物料名称', align: 'center', fixedLeft: true, tips: true
                                },

                                {
                                    field: 'quantity', title: '数量', align: 'center', fixedLeft: true, tips: true
                                },

                                {
                                    field: 'upperLimit', title: '库存上限', align: 'center', fixedLeft: true, tips: true
                                },
                                {
                                    field: 'floorLimit', title: '库存下限', align: 'center', fixedLeft: true, tips: true
                                },
                                {
                                    field: 'quantityState', title: '状态', align: 'center', fixedLeft: true, tips: true,
                                    formatter: function (value, row, index) {




                                        if (value ==='积压' ){return "<button style='background-color: #dd4444;border-style: none' class='btn btn-blue detail-account'>积压</button>";}
                                        else if (value === '缺货' ){return "<button style='background-color: #f0ad4e;border-style: none' class='btn btn-blue detail-account'>缺货</button>";}


                                    }
                                },

                            ]
                })
                //权限——查看
               /* if (!M.Authority.checkAuthority('unsubscribe-detail')) {
                    $(tableHookName).bootstrapTable('hideColumn', 'operate');//隐藏列
                }*/
            });
        }
    });
})();