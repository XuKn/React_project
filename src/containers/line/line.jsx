import React from 'react'
import * as echarts from 'echarts'
export default class Line extends React.Component {
  componentDidMount() {
    this.showBarChart()
  }
 
  showBarChart = () => {
    var myChart = echarts.init(document.getElementById('LineWrap'));

    // 指定图表的配置项和数据
    var option = {
      xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
          type: 'value'
      },
      series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
      }]
  };
  

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }
  render() {
    return (
      <div style={{width:'100%',height:'100%'}} id="LineWrap" />
    )
  }
}