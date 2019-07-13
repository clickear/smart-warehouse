import $ from 'jQuery';


(function () {

    let $setTimeout = null;
    let ec = window.echarts;
    const BRANCH_NAME = '全国';
    var $chart = null;
    var data = null;
    var option = null;
    // 初始化地图实力

        let $vue = new Vue({
                el: '.homepage-hook',
                data: {
                    boxs: {
                        box1: {show: true, hook: '.box1-hook', lock: true, url: '', params: {}},
                        box2: {show: false, hook: '.box2-hook', url: '', params: {}},
                        box3: {show: false, hook: '.box3-hook', url: '', params: {}},
                        box4: {show: false, hook: '.box4-hook', url: '', params: {}}
                    },
                    statistics: {
                        palletTotal: 0,
                        storageTotal: 0,
                      /*  subletTotal: 0,*/
                        transportTotal: 0
                    },
                    branch: {
                        province: BRANCH_NAME,
                        directTotal: 0,
                      /*  agentTotal: 0,*/
                        customerTotal: 0,
                        palletTotal: 0
                    },
                    storyData: []
                },
                created: function () {

                },


                mounted: function () {
                    this.$nextTick(() => {
                        var $box = $('.homepage-hook');
                        let tableHookName = '.schedule-table-hook';
                        var $tableHook = $box.find(tableHookName).bootstrapTable({
                            // el: tableHookName,
                            scrollbar: 'homepage-table-body',
                            striped: true, // 设置为 true 会有隔行变色效果
                            pagination: true, // true 显示分页
                            paginationDetail: false, // 分页详情
                            sidePagination: 'server', // 服务器端
                            method: 'post',
                            url: URI.HOMEPAGE.INVENTORY_WARNING.LIST,
                            debug: false,
                            cache: false,
                            pageNumber: 1,
                            pageSize: 5,
                            // fixedColumns: true,
                            customButton: '',
                            customQueryParams: function (params) {
                                // var formParams = $form.serializeJson();
                                // var queryParams = $.extend({}, params, formParams);
                                // return queryParams;
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
                                    field: 'itemNameVch', title: '物料名称', align: 'center', fixedLeft: true
                                },
                                {
                                    field: 'quantityFl', title: '数量', align: 'center', fixedLeft: true
                                },
                                {
                                    field: 'unitCodeVch', title: '单位', align: 'center', fixedLeft: true
                                },
                                {
                                    field: 'floorLimitInt', title: '最低库存', align: 'center', fixedLeft: true
                                }
                            ]
                        });

                    });
                }
            })
        ;

})();
