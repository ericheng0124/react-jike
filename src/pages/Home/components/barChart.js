// 柱状图组件
import {useEffect, useRef} from "react"
import * as echarts from "echarts"

const BarChart = ({title}) => {
  const chartRef = useRef(null)
  useEffect(() => {
    // 保证dom可用,才可以进行图表渲染
    // 1. 获取渲染图表的dom节点
    const chartDom = chartRef.current
    // 2. 图表初始化生成图表实例对象
    const myChart = echarts.init(chartDom)
    // 3. 准备图表参数
    const option = {
      title: {
        text: title
      },
      xAxis: {
        type: 'category',
        data: ['Angular', 'Vue', 'React']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [10, 40, 70],
          type: 'bar'
        }
      ]
    }
    // 3. 使用图表参数完成图表渲染
    option && myChart.setOption(option)
  }, [title])
  return (
    <div ref={chartRef} style={{height: 300, width: 400}}></div>
  )
}

export default BarChart