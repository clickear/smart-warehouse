/**
 * Created by Administrator on 2017/10/13.
 */
import $ from 'jQuery';
(function () {
    let checkFileType = function(fileName){
        var index= fileName.lastIndexOf('.'); //得到"."在第几位
        var suffix=fileName.substring(index); //截断"."之前的，得到后缀
        if(suffix!=".bmp"&&suffix!=".png"&&suffix!=".gif"&&suffix!=".jpg"&&suffix!=".jpeg"&&suffix!=".pdf"){  //根据后缀，判断是否符合图片格式和pdf格式
            return false;
        }
        return true;
    };
    let orderNo = JSON.parse(IOT.getSessionStore(URI.RENT.RENTAL.DETAIL.CONTRACTMANAGEMENT.PAGE));
    let $vue = new Vue({
        el: '.contract-management-hook',
        data: {
            info:{
                bussinessNo:orderNo,
                module:'1',
                contractFile:''
            }
        },
        methods: {
            cancleBack: function () {
                M.Page.emitPrePage();
            },
            uploadFile:function () {
                let params = $vue.$data.info;
                params.contractFile =$('#contractFile')[0].files[0];
                if(!checkFileType(params.contractFile.name)){
                    IOT.tips('不是指定图片或PDF格式,请重新选择！', 'error', 1000, null);
                    return;
                }
                IOT.showOverlay('保存中，请稍等...');
                IOT.doFileUpload2(URI.RENT.RENTAL.DETAIL.CONTRACTMANAGEMENT.UPLOAD,params, function (ret) {
                    IOT.tips(ret.msg || '操作失败，请重试！', 'error', 1000, null);
                    IOT.hideOverlay();
                    if (ret && ret.code === 200) {
                        IOT.tips('保存成功！', 'success');
                        M.Table.refresh.all();
                    } else {
                        IOT.tips(ret.msg || '操作失败，请重试！', 'error', 1000, null);
                    }
                });
            }

        },
        mounted: function () {
            this.$nextTick(() => {
                var $contractTable = $('.contract-table-hook');
                var $tableHook = $contractTable.bootstrapTable({
                    scrollbar: 'contract-table-body',
                    striped: true, // 设置为 true 会有隔行变色效果
                    pagination: true, // true 显示分页
                    paginationDetail: false, // 分页详情
                    sidePagination: 'server', // 服务器端
                    method: 'post',
                    url: URI.RENT.RENTAL.DETAIL.CONTRACTMANAGEMENT.LIST,
                    debug: false,
                    cache: false,
                    pageNumber: 1,
                    pageSize: 20,
                    // fixedColumns: true,
                    customButton: '',
                    customQueryParams: function (params) {
                        var param = {bussinessNo:orderNo};
                        var queryParams = $.extend({}, params, param);
                        return queryParams;
                    },
                    onLoadSuccess: function (data) {

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
                            field: 'fileName', title: '文件名', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'size', title: '文件大小(Kb)', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'uploadUserName', title: '上传人', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'uploadUserPhone', title: '上传人手机', align: 'center', fixedLeft: true
                        },
                        {
                            field: 'uploadTime', title: '上传时间', align: 'center', fixedLeft: true,
                            formatter: function (value, row, index) {
                                /* 0未确认；1已确认； */
                                return new Date(value).Format('yyyy-MM-dd h:m:s');
                            }
                        },
                        {
                            field: 'operate', title: '操作', align: 'center', fixedLeft: true, width: 100,
                            events: {
                                'click .detail-account': function (e, value, row, index) {
                                    IOT.setSessionStore(URI.RENT.RENTAL.DETAIL.CONTRACTMANAGEMENT.PREVIEW, JSON.stringify(row));
                                    M.Page.emit(URI.RENT.RENTAL.DETAIL.CONTRACTMANAGEMENT.PREVIEW);
                                    return false;
                                }
                            },
                            formatter: function (value, row, index) {
                                return `<a class="detail-account">查看</a>`;

                            }
                        }
                    ]
                });
                // 查看
                if (!M.Authority.checkAuthority('pallet-lease-contract-detail')) {
                    $contractTable.bootstrapTable('hideColumn', 'operate'); // 隐藏列
                }
            });
        }
    });
})();


















