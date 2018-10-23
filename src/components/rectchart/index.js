import React, { Component } from 'react'
import * as d3 from 'd3'
import './index.less';
import Ajax from './../../axios'
import { easeLinear } from 'd3';

export default class Rectchart extends Component {
  constructor(props) {
    super(props)
    this.config = {
      width: 0,
      height: 0,
      padding: 40
    }
  }

  getData(){
    Ajax.ajax({ 'url': 'chart' }).then(data => {
      this.show(data.array)
    }) 
  }

  show(data) {
    const padding = this.config.padding
    const width = this.chartRef.parentElement.clientWidth - padding
    const height = this.chartRef.parentElement.clientHeight - padding
    this.config.width = width
    this.config.height = height
    const rectHeight = 15

    /* const dataset = [{ "x": "湖北", "y": 28 },
    { "x": "湖南", "y": 46 },
    { "x": "山东", "y": 19 },
    { "x": "陕西", "y": 33 },
    { "x": "甘肃", "y": 17 },
    { "x": "浙江", "y": 45 },
    { "x": "四川", "y": 26 },
    { "x": "北京", "y": 41 },
    { "x": "上海", "y": 17 }] */

    let dataset = data

    let svg = d3.select(this.chartRef).attr('width', width).attr('height', height)

    svg.append("g")
      .append("text")
      .text("防护类型统计")
      .attr("class", "title")
      .attr("x", 0)
      .attr("y", 20)
      .attr('fill','#fff')
      .style('font-size', '15px');

    let linear = d3.scaleLinear().domain([0, 50]).range([0, width -padding]);
    let y = d3.scaleBand().domain(data.map(d => d.x)).rangeRound([ 0 , height - padding]).paddingInner(0.8)

    //添加高斯模糊
    let defs = svg.append('defs')
      .append('filter')
      .attr('id','filter')
      .attr('x',0)
      .attr('y',0)
      .append('feGaussianBlur')
      .attr('in','SourceGraphic')
      .attr('stdDeviation',1)

    let rects = svg.selectAll('.rectchart')
      .data(dataset)
      .enter()
      .append('rect')
      .attr('class', 'rectchart')
      .attr('transform', "translate(" + (padding+10)  + "," + padding + ")")
      .attr('x', 0)
      .attr('y',(d,i) => y(d.x))
      .attr('rx',2)
      .attr('ry',2)
      .attr('height', y.bandwidth)
      .attr("fill", "#0099ff")
      .attr('filter', 'url(#filter)')
      .attr("opacity", 0.8)
      .attr('width', 0)
      .on('mouseenter', function (d) {
        //console.log('this')
        d3.select(this).attr('opacity', 0.4).style('cursor','hand')
      })
      .on('mouseout',function(d){
        d3.select(this).attr('opacity', 0.8)
      })
      .transition()
      .duration(2000)
      .delay(200)
      .ease(easeLinear)
      .attr('width',(d) =>{
        //let temp = document.getElementsByClassName('myrect')
        //console.log(temp)
        return linear(d.y)})
      

    let lefttexts = svg.selectAll(".leftText")
      .data(dataset)
      .enter()
      .append("text")
      .attr("class", "leftText")
      .attr("transform", "translate(" + padding/2 + "," + padding + ")")
      .attr("x", 0)
      .attr("y", (d, i) => y(d.x))
      .attr("dy", 8)
      .text((d) => (d.x))
      //.attr('fill', '#49A5DD')
      .attr('fill', 'white')
      .attr('font-size', '12px');

    let righttexts = svg.selectAll(".rightText")
      .data(dataset)
      .enter()
      .append("text")
      .attr("class", "rightText")
      .attr("transform", "translate(" + (padding + 10) + "," + padding + ")")
      .attr("x", (d, i) => (linear(d.y) + 2))
      .attr("y", (d, i) => y(d.x))
      .attr("dy", 8)
      .text((d) => (d.y))
      //.attr('fill', '#49A5DD')
      .attr('fill', '#fff')
      .attr('font-size', '0px')
      .transition()
      .duration(2000)
      .delay(200)
      .attr('font-size', '12px')
    }

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <svg ref={(r) => this.chartRef = r}></svg>
    )
  }
}