import $ from 'jQuery';
require('../../../../less/back/task/cell.less');

require('../../../../../static/lib/jquery/jquery-barcode.min');


(function () {

    let $vue = new Vue({
        el: '.main-hook',
        data: {

            barCode:'',
            barText:'',
            boxs: {
                box1: {show: true, hook: '.box1-hook', lock: true, url: '/back/task/cell/bar/page', params: {}},
                box2: {show: false, hook: '.box2-hook', url: '', params: {}},
                box3: {show: false, hook: '.box3-hook', url: '', params: {}},
                box4: {show: false, hook: '.box4-hook', url: '', params: {}}
            },

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
            createBar:function(){
                
                var varCode = this.barCode;
                $("#bcTarget").barcode(varCode, "code128",{
                    // output:'css',       //渲染方式 css/bmp/svg/canvas
                    //bgColor: '#ff0000', //条码背景颜色
                    color: '#000000',   //条码颜色
                    barWidth: 2,        //单条条码宽度
                    barHeight: 100,     //单体条码高度
                    // moduleSize: 5,   //条码大小
                    // posX: 10,        //条码坐标X
                    // posY: 5,         //条码坐标Y
                    //  addQuietZone: false  //是否添加空白区（内边距）
                });

            }




        },
        created:function(){
            var varCode = this.barCode;
            $("#bcTarget").barcode(varCode, "code128",{
               // output:'css',       //渲染方式 css/bmp/svg/canvas
                //bgColor: '#ff0000', //条码背景颜色
                color: '#000000',   //条码颜色
                barWidth: 2,        //单条条码宽度
                barHeight: 100,     //单体条码高度
                // moduleSize: 5,   //条码大小
                // posX: 10,        //条码坐标X
                // posY: 5,         //条码坐标Y
              //  addQuietZone: false  //是否添加空白区（内边距）
            });
        },


    });
})();










