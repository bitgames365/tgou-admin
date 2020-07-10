<!--Example  Echarts怎么用的-->
<template>
    <div class="Echarts">
        <div class="ma-0 mt-5" id="main"></div>
    </div>
</template>

<script>
    export default {
        name: 'Echarts',
        data: () => ({
            num1: 200,
            num2: 18,
        }),
        methods: {
            expEcharts() {
                // 基于准备好的dom，初始化echarts实例
                var myChart = this.$echarts.init(document.getElementById('main'));

                // 指定图表的配置项和数据
                var option = {
                    title: {
                        text: '配置统计信息',
                        subtext: "合规情况",
                        left: 'center',
                    },
                    color:["#01579B",'#E65100', 'yellow','blueviolet'],
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        top: 30,
                        data: ['合规配置', '不合规']
                    },
                    series: [{
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: [{
                                value: this.num1,
                                name: '合规配置'
                            },
                            {
                                value: this.num2,
                                name: '不合规'
                            }
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            }
        },

        mounted() {
            /* 加载完成后才展示表格，否则设置高度宽度属性会不起作用。*/
            this.$nextTick(() => {
                this.expEcharts();
            });
        },
    }
</script>

<style>
#main{
    width: 100%;
    height: 100%;
}
.Echarts{
    width: 100%;
    height: 100%;
}
</style>