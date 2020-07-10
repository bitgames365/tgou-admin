<template>
  <div ref="chart"
       style="width:300px;height:300px"></div>
</template>

<script>
import echarts from 'echarts'
import resize from 'mixins/echartsResize'

import * as BARCONFIG from 'config/echarts'

export default {
  name: 'BarChart',
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  watch: {
    data: {
      handler() {
        this.initChart()
      },
      deep: true
    }
  },
  mixins: [resize],
  computed: {},
  methods: {
    initChart() {
      const that = this
      // 坐标轴配置
      const xyAxisConfig = {
        // 坐标轴轴线
        axisLine: {
          lineStyle: {
            color: '#98A9C4'
          }
        },
        // 坐标轴刻度
        axisTick: {
          lineStyle: {
            color: '#DEE6FD'
          }
        },
        // 坐标轴刻度标签
        axisLabel: {
          lineStyle: {
            color: '#DEE6FD'
          },
          interval: 0
          // rotate: 30
        },
        nameTextStyle: {
          color: '#98A9C4'
        }
      }
      const option = {
        // color: BARCONFIG.THEME,
        color: ['#ff0', 'f0f'],
        title: {
          text: '部门数据对比',
          // textStyle: BARCONFIG.TITLE
        },
        legend: {
          // data: ['过滤率', '成功发送率', '点击率', '转化率']
          data: [
            {
              name: '过滤率',
              icon: 'circle'
            },
            {
              name: '成功发送率',
              icon: 'circle'
            },
            {
              name: '点击率',
              icon: 'circle'
            },
            {
              name: '转化率',
              icon: 'circle'
            }
          ],
          top: 'top',
          left: 'right',
          textStyle: BARCONFIG.LEGEND
        },
        grid: {
          top: 60,
          left: 40,
          right: 20,
          bottom: 40
        },
        tooltip: {
          trigger: 'axis',
          ...BARCONFIG.TOOLTIP,
          // axisPointer: {
          //   type: 'shadow'
          // },
          formatter: function(params) {
            let str = `<div style="${BARCONFIG.TOOLTIP_BOXSHADOW}">`
            params.map(item => {
              str += `<div>${item.marker} ${item.seriesName}${
                item.value[item.seriesIndex + 1]
              }%</div>`
            })
            str += '</div>'
            return str
          }
        },
        dataset: {
          source: that.normalize()
        },
        xAxis: { type: 'category', ...xyAxisConfig },
        yAxis: {
          ...xyAxisConfig,
          name: '百分比',
          splitLine: {
            lineStyle: {
              color: '#F2F5FE'
            }
          }
        },
        series: [
          {
            type: 'bar',
            barCategoryGap: '60%',
            itemStyle: { barBorderRadius: [8, 8, 0, 0] }
          },
          {
            type: 'bar',
            barCategoryGap: '60%',
            itemStyle: { barBorderRadius: [8, 8, 0, 0] }
          },
          {
            type: 'bar',
            barCategoryGap: '60%',
            itemStyle: { barBorderRadius: [8, 8, 0, 0] }
          },
          {
            type: 'line',
            barCategoryGap: '60%',
            itemStyle: { barBorderRadius: [8, 8, 0, 0] }
          }
        ]
      }

      if (!this.echarts) {
        this.echarts = echarts.init(this.$refs.chart)
      }
      this.echarts.setOption(option)
    },
    normalize() {
      // [
      //   ['department', '过滤率', '成功发送率', '点击率', '转化率'],
      //   ['部门一', 43.3, 85.8, 93.7, 81.5],
      //   ['部门二', 83.1, 73.4, 55.1, 61.2],
      //   ['部门三', 86.4, 65.2, 82.5, 51.3],
      //   ['部门四', 72.4, 53.9, 39.1, 71.4],
      //   ['部门五', 62.4, 57.9, 69.1, 51.4]
      // ]
      let data = this.data.map(item => {
        return [
          item.name,
          item.filterRate,
          item.successCountRate,
          item.clickRate,
          item.successClickRate
        ]
      })
      data.unshift(['department', '过滤率', '成功发送率', '点击率', '转化率'])
      return data
    }
  },
  mounted() {
    this.initChart()
  }
}
</script>

<style lang='stylus' scoped></style>