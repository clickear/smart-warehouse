import $ from 'jQuery';

(function () {
  var list;
    let $vue = new Vue({
        el: '.main-hook',
        data: {
            boxs: {
                box1: {show: true, hook: '.box1-hook', lock: true, url: '', params: {}},
                box2: {show: false, hook: '.box2-hook', url: '', params: {}},
                box3: {show: false, hook: '.box3-hook', url: '', params: {}},
                box4: {show: false, hook: '.box4-hook', url: '', params: {}}
            },
            selected: '',
            items: []
        },
        created:function(){
            IOT.getServerData(URI.RUN.HELP_DOCUMENT.CATEGORY,{},(ret) => {
                if (ret.code === 200) {
                    $vue.$data.items = ret.data;
                    //$vue.$data.selected =$vue.$data.items[0].categoryId;
                } else {
                    IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                }
            });
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
            // 发布优惠页面
            newRelease: function () {
                M.Page.emit(URI.RUN.HELP_DOCUMENT.CREATE.PAGE);
                IOT.setSessionStore(URI.RUN.HELP_DOCUMENT.CREATE.PAGE, JSON.stringify({action: ACTION.CREATE}));
            }
        },
       computed:{
          selection: {
           get: function() {
             try {
                   var that = this;
                   return this.items.filter(function (item) {
                       return item.categoryId == that.selected;
                   })[0].helpCategoryList;
              } catch(err) {

               }
             }
           }
       },
        mounted: function () {
            this.$nextTick(() => {
                let tableHookName = '.help-document-table-hook';
                var $defaultHook = $('.help-document-hook');
                // 查询
                var $form = $defaultHook.find('.form-search-hook');
                // 查询
                $form.off('submit').on('submit', function () {
                    $(tableHookName).bootstrapTable('onCustomSearch');
                    return false;
                });
                var $tableHook = $defaultHook.find(tableHookName).bootstrapTable({
                    scrollbar: 'help-document-table-body',
                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端
                    method: 'post',
                    url: URI.RUN.HELP_DOCUMENT.LIST,
                    debug: false,
                    cache: false,
                    pageNumber: 1,
                    pageSize: 15,
                    // fixedColumns: true,
                    customButton: '',
                    customQueryParams: function (params) {
                        var formParams = $form.serializeJson();
                        var queryParams = $.extend({}, params, formParams);
                        // console.log(queryParams);
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
                            formatter: function (val, rowData, index) {
                                return index + 1;
                            }
                        },
                        {
                            field: 'parentName', title: '一级分类', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'categoryName', title: '二级分类', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'title', title: '标题', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'state', title: '状态', align: 'center', fixedLeft: true,width:120,
                            formatter: function (value, row, index) {
                                /* 1平台出租；2代理商出租； */
                                if (value === 'normal' ){return "启用";}
                                else if (value === 'invalid' ){return "未启用";}
                                else if (value === 'deleted' ){return "已删除";}
                            }
                        },
                        {
                            field: 'operate', title: '操作', align: 'center', fixedLeft: true, width: 160,
                            events: {
                                'click .detail': function (e, value, row, index) {
                                    M.Page.emit(URI.RUN.HELP_DOCUMENT.DETAIL.PAGE);
                                    IOT.setSessionStore(URI.RUN.HELP_DOCUMENT.DETAIL.PAGE, JSON.stringify({
                                        id:row.contentId
                                    }));
                                    return false;
                                },
                                'click .modify': function (e, value, row, index) {
                                    M.Page.emit(URI.RUN.HELP_DOCUMENT.CREATE.PAGE);
                                    IOT.setSessionStore(URI.RUN.HELP_DOCUMENT.CREATE.PAGE, JSON.stringify({
                                        action: ACTION.MODIFY,
                                        id: row.contentId
                                    }));
                                    return false;
                                },
                              'click .delete': function (e, value, row, index) {
                                  layer.confirm(' &nbsp;&nbsp; &nbsp;&nbsp;是否确认删除？', {
                                      btn: ['确定', '取消'] //按钮
                                  }, function () {
                                      IOT.getServerData(URI.RUN.HELP_DOCUMENT.DELETE, {contentId:row.contentId}, (ret) => {
                                          if (ret.code === 200) {
                                              layer.closeAll();
                                              M.Table.refresh.all();
                                          } else {
                                              IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                                          }
                                      });

                                  }, function () {
                                      //取消
                                  });
                                  return false;
                                }
                            },
                            formatter: function (value, row, index) {
                                return `<a class="detail operate">查看</a>
                                        <a class="modify operate">修改</a>
                                        <a class="delete operate">删除</a>`
                                        ;
                            }
                        }
                    ]
                });
            });
        }
    });
})();




















