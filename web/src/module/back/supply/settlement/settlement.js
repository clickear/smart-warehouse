/**
 * Created by Administrator on 2017/10/11.
 */
import $ from 'jQuery';

(function () {
    let $vue = new Vue({
        el: '.settlement-main-hook',
        data: {
            boxs: {
                box1: {show: true, hook: '.box1-hook', lock: true, url: '', params: {}},
            },
            statistics:{
                'title':'',//标题
                'supplyStatisticsList':{}
            },
            allPalletCount:[],//托盘总数
            placeOrderTimeString:[],//下单时间字符串
            allCostsCount:[],//金额总数
            orderCount:[],//订单数

        },

        methods: {
            searchForm:function(){
                var $form = $('.form-search-hook');
                var formParams = $form.serializeJson();
                IOT.getServerData(URI.SUPPLY.SETTLEMENT.LINE,formParams , (ret) => {
                    if (ret.code === 200) {
                        this.statistics.title ='';
                        this.statistics.supplyStatisticsList.length=0;
                        this.placeOrderTimeString.length=0;
                        this.allCostsCount.length=0;
                        this.allPalletCount.length=0;
                        this.orderCount.length=0;

                        this.statistics = $.extend({}, this.statistics, ret.data);
                        $.each($vue.$data.statistics.supplyStatisticsList,function(i,v){
                            $vue.$data.allPalletCount.push(v.allPalletCount);
                            $vue.$data.placeOrderTimeString.push(v.placeOrderTimeString);
                            $vue.$data.allCostsCount.push(v.allCostsCount);
                            $vue.$data.orderCount.push(v.orderCount)

                        });
                        this.drawLine();
                        this.drawLine2()
                    } else {
                        IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                    }
                });
            },
            chose:function () {
                var  obj=document.getElementById( 'select1' );
                var  index=obj.selectedIndex;  //序号，取当前选中选项的序号
                var  val = obj.options[index].value;
                    if(val==1){
                        $('#myChart').addClass("display");
                        $('#myChart2').removeClass("display")
                    }else if(val==0){
                        $('#myChart2').addClass("display");
                        $('#myChart').removeClass("display");

                    }
            },
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
            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('myChart'));
                // 绘制图表
                myChart.setOption({
                    title: {
                        text:this.statistics.title!= "无有效数据"?this.statistics.title+"的交易金额":this.statistics.title,
                        subtext: '',//副标题
                        x:'right',
                        align:'center'
                    },
                    tooltip: {
                        trigger: 'axis',//提示框触发装置
                        padding: [10, 15],
                        formatter:function (params) {
                            var str = $vue.$data.placeOrderTimeString[params[0].dataIndex] + '</br>';
                            str+=  '金额：'+$vue.$data.allCostsCount[params[0].dataIndex] + '</br>';
                            str += '托盘总数：' + $vue.$data.allPalletCount[params[0].dataIndex]+ '</br>';
                            str += '订单数：'+ $vue.$data.orderCount[params[0].dataIndex];
                            return str;
                        }
                    },
                    toolbox: {//工具栏
                        show: true,
                        feature: {//自定义工具按钮
                            dataZoom: {//数据区域缩放
                                yAxisIndex: 'none'
                            },
                            dataView: {readOnly: false},//数据视图工具，可以展现当前图表所用的数据，编辑后可以动态更新
                            magicType: {type: ['line', 'bar']},//动态类型切换
                            restore: {},//重置
                            saveAsImage: {}//保存图片
                        }
                    },
                    xAxis:  {
                        type: 'category',
                        boundaryGap: true,//拓展数值空间
                        data:this.placeOrderTimeString,
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: { //刻度配置
                            formatter: '{value} 元'
                        },
                    },
                    series: [
                        {
                            name:'金额',
                            type:'line',
                            symbolSize:5,
                            data:this.allCostsCount,
                        }
                    ]
                });
            },
            drawLine2() {
                    // 基于准备好的dom，初始化echarts实例
                    let myChart = echarts.init(document.getElementById('myChart2'));
                    // 绘制图表
                    myChart.setOption({
                        title: {
                            text:this.statistics.title!= "无有效数据"?this.statistics.title+"的托盘数量":this.statistics.title,
                            subtext: '',//副标题
                            x:'right',
                            align:'center'
                        },
                        tooltip: {
                            trigger: 'axis',//提示框触发装置
                            padding: [10, 15],
                            formatter:function (params) {
                                var str = $vue.$data.placeOrderTimeString[params[0].dataIndex] + '</br>';
                                str += '托盘总数：' + $vue.$data.allPalletCount[params[0].dataIndex]+ '</br>';
                                str+=  '金额：'+$vue.$data.allCostsCount[params[0].dataIndex] + '</br>';
                                str += '订单数：'+ $vue.$data.orderCount[params[0].dataIndex];
                                return str;
                            }
                        },
                        toolbox: {//工具栏
                            show: true,
                            feature: {//自定义工具按钮
                                dataZoom: {//数据区域缩放
                                    yAxisIndex: 'none'
                                },
                                dataView: {readOnly: false},//数据视图工具，可以展现当前图表所用的数据，编辑后可以动态更新
                                magicType: {type: ['line', 'bar']},//动态类型切换
                                restore: {},//重置
                                saveAsImage: {}//保存图片
                            }
                        },
                        xAxis:  {
                            type: 'category',
                            boundaryGap: true,//拓展数值空间
                            data:this.placeOrderTimeString,
                        },
                        yAxis: {
                            type: 'value',
                            axisLabel: { //刻度配置
                                formatter: '{value} 件'
                            },
                        },
                        series: [
                            {
                                name:'托盘总数',
                                type:'line',
                                symbolSize:5,
                                data:this.allPalletCount
                            },
                        ]
                    });
                }

        },
        created: function () {
            IOT.getServerData(URI.SUPPLY.SETTLEMENT.LINE, {}, (ret) => {
                if (ret.code === 200) {
                    this.statistics = $.extend({}, this.statistics, ret.data);
                    $.each($vue.$data.statistics.supplyStatisticsList,function(i,v){
                        $vue.$data.allPalletCount.push(v.allPalletCount);
                        $vue.$data.placeOrderTimeString.push(v.placeOrderTimeString);
                        $vue.$data.allCostsCount.push(v.allCostsCount);
                        $vue.$data.orderCount.push(v.orderCount);
                    });
                    this.drawLine();
                    this.drawLine2();
                } else {
                    IOT.tips(ret.message || '服务器请求失败，稍后再试！', 'error');
                }
            });
        },
        mounted: function () {
            this.drawLine();
            this.$nextTick(() => {
                var $accountBox = $('.settlement-hook');
                $accountBox.find('.area-hook').selectpicker({width: '120px'});
                $accountBox.find('.settlement-status-hook').selectpicker({width: '80px'});
                // 查询
                $accountBox.find('.search-hook').on('click', function () {
                    $(tableHookName).bootstrapTable('onCustomSearch');
                });
                $accountBox.find('input[name=orderStartTime]').datetimepicker({
                    width: '320px',
                    format: 'Y-m-d',
                    formatDate: 'Y-m-d',
                    scrollMonth: false,
                    scrollTime: false,
                    scrollInput: false,
                    timepicker: false // 关闭时间选项
                });
                $accountBox.find('input[name=orderEndTime]').datetimepicker({
                    width: '320px',
                    format: 'Y-m-d',
                    formatDate: 'Y-m-d',
                    scrollMonth: false,
                    scrollTime: false,
                    scrollInput: false,
                    timepicker: false // 关闭时间选项
                });
                let tableHookName = '.settlement-table-hook';

                // 省份-城市-区域
                //初始化，默认不选择任何一个
                var distpicker = {
                    init:function () {
                        $('#distpicker').distpicker();
                    }
                };
                //初始化-省份、城市、区县
                distpicker.init();
            });
        }
    });

})();



















