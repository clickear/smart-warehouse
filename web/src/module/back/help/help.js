require('../../../less/back/help/help.less');
import $ from 'jQuery';
(function () {
    let $vue= new Vue({
        el: '.help-hook',
        data: {
            account: {
                helpCategoryList:{}
            },
            items:{},
            list:{},
            categoryName2:[],//二级
            categoryName3:[],//三级
            boxs: {
                box1: {show: true, hook: '.box1-hook', lock: true, url: '', params: {}},
                box2: {show: false, hook: '.box2-hook', url: '', params: {}},
                box3: {show: false, hook: '.box3-hook', url: '', params: {}},
                box4: {show: false, hook: '.box4-hook', url: '', params: {}}
            }
        },
        created: function () {
            IOT.getServerData(URI.HELP.DATA,{}, (ret) => {
                if (ret.code === 200) {
                    $vue.$data.items = ret.data;
                } else {
                    IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                }
            });


        },
        computed:{

        },
        methods: {
            emitPage: function () {
                M.Page.load(this.boxs);
            },
            prePage: function () {
                M.Page.prePage(this.boxs);
            },
            // 触发刷新页(当前显示的页面)
            refreshPage: function () {
                M.Page.refreshPage(this.boxs);
            },
            readContent:function(r){
                M.Page.emit(URI.HELP.DETAIL.PAGE);
                IOT.setSessionStore(URI.HELP.DETAIL.PAGE, JSON.stringify({
                    id:r
                }));
            }
        },
        mounted: function () {
            this.$nextTick(() => {

            })
        }

    });


})();




















