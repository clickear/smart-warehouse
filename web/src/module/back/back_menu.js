import $ from 'jQuery';
(function () {
    let $vue = new Vue({
        el: '.main-container',
        data: {

        },
        methods: {
            ware:function(){
                $("#1").css("display","");
                $("#0").css("display","none");
            },
            base:function(){

            },
            report:function(){

            }

        },
        created: function () {




        },
        mounted: function () {
            this.$nextTick(() => {
               /* var wareCode = document.getElementById("ware").value;
                IOT.setLocalStore("backWare", wareCode);*/

            });
        }
    });
})();