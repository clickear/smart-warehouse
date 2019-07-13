/**
 * Created by Administrator on 2017/10/13.
 */
import $ from 'jQuery';

(function () {
   // let config = require('./router');

    let contract = JSON.parse(IOT.getSessionStore(URI.RENT.SUBLET.DETAIL.CONTRACTMANAGEMENT.PREVIEW));
    let $vue = new Vue({
        el: '.contract-preview-hook',
        data: {

        },
        methods: {
            cancleBack: function () {
                M.Page.emitPrePage();
                // M.Page.emitRefreshPage();
            },
        },
        mounted: function () {
            this.$nextTick(() => {
                var staticServer = $('#staticServer').val();
                var index= contract.fileName.lastIndexOf('.'); //得到"."在第几位
                var suffix=contract.fileName.substring(index);
                var $pdf = $('#contract-preview-pdf').hide();
                var $img = $('#contract-preview').hide();
                if(suffix=='.pdf'){
                    $pdf.attr("src",contract.url.substr(1));
                    $pdf.attr("title",contract.fileName);
                    $pdf.show();
                }else{
                    $img.attr("src",contract.url.substr(1));
                    $img.attr("title",contract.fileName);
                    $img.show();
                }


            });
        }
    });

})();




















