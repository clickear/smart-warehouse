import $ from 'jQuery';

(function () {
    let storeParams = JSON.parse(IOT.getSessionStore(URI.RUN.HELP_DOCUMENT.CREATE.PAGE));
    let action = storeParams.action;
    let EL = '.create-or-modify-discounts-hook';
    let $vue = new Vue({
        el: EL,
        data: {
            title: action === ACTION.CREATE ? '新增' : '修改',
            info: {
                title: '',
                categoryId:'',
                parentId: '',
                categoryName:'',
                parentName: '',
                content: ''
            },
            items: []
        },
        created: function () {
            IOT.getServerData(URI.RUN.HELP_DOCUMENT.CATEGORY,{},(ret) => {
                if (ret.code === 200) {
                    $vue.$data.items = ret.data;
                    if (action === ACTION.CREATE) {
                        $vue.$data.info.parentId = $vue.$data.items[0].categoryId;
                        $vue.$data.info.parentName = $vue.$data.items[0].categoryName;
                        $vue.$data.info.categoryId = $vue.$data.items[0].helpCategoryList[0].categoryId;
                        $vue.$data.info.categoryName = $vue.$data.items[0].helpCategoryList[0].categoryName;
                    }
                } else {
                    IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                }
            });
        },
        methods: {
            newParentVal:function(){
                try{
                    $vue.$data.info.parentName = $("#parentId option:selected")[0].text;
                    $vue.$data.info.parentId = $("#parentId option:selected")[0].value;
                    $vue.$data.info.categoryName ='';
                    $vue.$data.info.categoryId = '';
                } catch(err) {}
            },
            newCategoryVal:function(){
                try{
                    $vue.$data.info.categoryName = $("#categoryId option:selected")[0].text;
                    $vue.$data.info.categoryId = $("#categoryId option:selected")[0].value;
                } catch(err) {}
            },
            inputNew:function(){
                $vue.$data.info.parentId = null;
                $vue.$data.info.categoryName='';
                $vue.$data.info.categoryId = null;
            },
            newCategoryName:function () {
                $vue.$data.info.categoryId = null;
            },
            goBack: function () {
                M.Page.emitPrePage();
            }
        },
        computed:{
            selection: {
                get: function() {
                    try {
                        var that = this;
                        return this.items.filter(function (item) {
                            return item.categoryId == $vue.$data.info.parentId
                        })[0].helpCategoryList;
                    } catch(err) {

                    }
                }
            }
        },
        mounted: function () {
            this.$nextTick(() => {
                UE.delEditor('edit-content');
                var ue = UE.getEditor('edit-content');
                if (action === ACTION.MODIFY) {
                    IOT.getServerData(URI.RUN.HELP_DOCUMENT.MODIFY.DATA, {id: storeParams.id}, (ret) => {
                        if (ret.code === 200) {
                            setTimeout(function () {
                                ue.setContent(ret.data.content || '');
                                // 一定要延时执行，不然会报错；
                            }, 100);
                            this.info = $.extend({}, this.info, ret.data);
                            this.info.content = this.info.content || '';
                        } else {
                            IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                        }
                    });
                }
                let $createModify = $(EL);
                $createModify.find('.form-hook').validate({
                    debug: true,
                    rules: {
                        title: {
                            required: true,
                            minlength: 1,
                            maxlength: 120
                        },
                    },
                    submitHandler: function (form) {
                         if($vue.$data.info.parentName==''){
                              layer.alert('一级分类不能为空');
                             return false;
                         }
                        if($vue.$data.info.categoryName==''){
                            layer.alert('二级分类不能为空');
                            return false;
                        }
                        IOT.showOverlay('保存中，请稍等...');
                        let params = $vue.$data.info;
                        let content = ue.getContent();
                        params.content = content;
                        console.log(params.content);
                        console.log(params);
                        let url = URI.RUN.HELP_DOCUMENT.CREATE.SAVE;
                        if (action === ACTION.MODIFY) {
                            url = URI.RUN.HELP_DOCUMENT.MODIFY.SAVE;
                        }
                        IOT.getServerData(url, params, function (ret) {
                            IOT.hideOverlay();
                            if (ret && ret.code === 200) {
                                IOT.tips('保存成功！', 'success');
                                if (action === ACTION.CREATE) {
                                    M.Page.emitPrePage();
                                }
                                M.Table.refresh.all();
                            } else {
                                IOT.tips(ret.message || '操作失败，请重试！', 'error');
                            }
                        });
                        return false;
                    }
                });
            });
        }
    });
})();
















