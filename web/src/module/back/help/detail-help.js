/**
 * Created by Administrator on 2017/10/13.
 */
/**
 * Created by Administrator on 2017/10/13.
 */
import $ from 'jQuery';
(function () {
    let detailId = JSON.parse(IOT.getSessionStore(URI.HELP.DETAIL.PAGE));
    console.log(detailId);
    let $vue = null;
    $vue = new Vue({
        el: '.detail-helpwork-hook',
        data: {
            info:{
                title:'',
                createTime:'',
                content:'',
            }
        },
        created: function () {
            IOT.getServerData(URI.RUN.HELP_DOCUMENT.DETAIL.DATA, {id: detailId.id}, (ret) => {
                if (ret.code === 200) {
                    this.info = $.extend({}, this.info, ret.data);
                    this.info.createTime=new Date(this.info.createTime).Format('yyyy-MM-dd hh:mm:ss');
                    console.log(this.info.content);
                    this.info.content = this.info.content || '';
                } else {
                    IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                }
            });
        },
        methods: {
            cancleBack: function () {
                M.Page.emitPrePage();
                // M.Page.emitRefreshPage();
            },

        },
        mounted: function () {
            this.$nextTick(() => {
            });
        }
    });
})();




















