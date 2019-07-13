import $ from 'jQuery';

(function () {
    let $vue = new Vue({
        el: '.detail-preferential-hook',
        data: {
            preferential: {
                title: 'ZL12345',
                class: '租赁优惠',
                publisher: '发布人',
                time:'2017-09-05 11:40:40',
                outside:'是',
                place: 'www.baidu.com'
            }
        },
        methods: {
            goBack: function () {
                M.Page.emitPrePage();
            },
            setAgain:function () {   // 再次编辑页面
                M.Page.emit(URI.RUN. PREFERENTIAL_POLICIES.AGAIN.PAGE);
            }
        },
        mounted: function () {
            this.$nextTick(() => {

            });
        }


    });
})();





















