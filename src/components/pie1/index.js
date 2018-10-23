import React, { Component } from 'react'
import * as d3 from 'd3'
import Ajax from './../../axios'
import './index.less'
import { easeLinear, selectAll } from 'd3';

export default class Pie1 extends Component {
  constructor(props) {
    super(props)
    this.config = {
      width: 0,
      height: 0,
      padding: 40,
      data: [],
      sum: 0,
      status: true
    }
  }

  getData() {
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
    this.config.data = data;
    let dataset = data;

    let svg = d3.select(this.chartRef).attr('width', width).attr('height', height);

    svg.append("g")
      .append("text")
      .text("威胁人员排行TOP5")
      .attr("class", "title")
      .attr("x", 0)
      .attr("y", 20)
      .attr('fill', '#fff')
      .style('font-size', '15px')

    let pie = d3.pie().sort(null).value((d) => (d.y))
    let sum = d3.sum(dataset,(d)=>d.y);
    this.config.sum = sum;
    const pieData = pie(dataset)
    const colorarray = ["#2277ff", "#2299ff", "#22aaff", "#0066ff", "#0033ff", "#0000ff", "#6699ff", "#6666ff", "#6633ff"]

    let radius = Math.min(width, height) * 0.7 / 2
    let arc = d3.arc().innerRadius(0.6 * radius).outerRadius(radius)
    //let arcText = d3.arc().innerRadius(0.7 * radius).outerRadius(0.7 * radius)
    let arcText = d3.arc().innerRadius(0).outerRadius(0)
    let colorScale = d3.scaleOrdinal().domain(d3.scaleOrdinal(0, dataset.length)).range(colorarray);
    let pathParent = svg.append("g").attr("transform", `translate(${width / 2 - padding / 2}, ${height / 2 + padding / 2})`);
    let tempData = []
    let y = d3.scaleBand().domain(data.map(d => d.x)).rangeRound([0, (radius * 4) / 2])


    let defs = svg.append('defs')
    let filter = defs.append('filter')
    filter.attr('id', 'piefilter')
    filter.append('feGaussianBlur')
      .attr('result', 'blurOut')
      .attr('in', 'SourceGraphic')
      .attr('stdDeviation', 1)


    pathParent.selectAll(".arc")
      .data(pieData)
      .enter()
      .append("path")
      .attr("class",(d,i) =>`arc _arc_${i} active`)
      .attr("fill", (d, i) =>colorScale(i))
      //.attr('opacity', 1)
      .style('cursor', 'hand')
      .each((d, i) => {
        tempData.push({ ...d, endAngle: d.startAngle })
      })
      .on('mouseover', (d, i) => {
       this.handle(d,i)
      })
      .transition()
      .duration(1000)
      .attrTween('d', (next, j) => {
        let i = d3.interpolate(tempData[j], next)
        return function (t) {
          return arc(i(t))
        }
      })

    //设置默认的文字
    pathParent.append('text')
      .attr("text-anchor", "middle")
      .attr('class', 'uptext')
      .attr('x', 0)
      .attr('y', -10)
      .attr('fill', 'white')
      .attr("font-size", "15px")
      .text('湖北')

    pathParent.append('text')
      .attr("text-anchor", "middle")
      .attr('class', 'downtext')
      .attr('x', 3)
      .attr('y', 10)
      .attr('fill', 'white')
      .attr("font-size", "18px")
      .text('10.3%')


    //给饼图创建右边的列表项
    let rects = svg.append("g")
    rects.selectAll('.rectlist')
      .data(dataset)
      .enter()
      .append('rect')
      .attr('class',(d,i) => `rect _rect_${i} active`)
      .attr('transform', "translate(" + (width / 2) + "," + (height / 2 - (padding)) + ")")
      .attr('x', (padding * 7) / 2)
      .attr('y', (d, i) => y(d.x) - (padding * 3) / 2)
      .attr('rx', 2)
      .attr('ry', 2)
      .attr('width', 18)
      .attr('height', 10)
      .attr("fill", (d, i)=> colorScale(i))
      .style('cursor', 'hand')
      .on('click', (d,i) => {
        this.handle(d,i)
      })

    let texts = svg.append("g")
    texts.selectAll('.pietext')
      .data(dataset)
      .enter()
      .append('text')
      .attr('class', 'pietext')
      .attr('transform', "translate(" + (width / 2) + "," + (height / 2 - (padding)) + ")")
      .attr('x', (padding * 7) / 2 + 22)
      .attr('y', (d, i) => y(d.x) - (padding * 3) / 2 + 8)
      .attr("fill", '#fff')
      .attr("opacity", 0.8)
      .text((d) => (d.x))
      .attr('font-size', '12px')

  }

  handle = (d,i) =>{
    let svg = d3.select(this.chartRef)
    if(d.data == undefined){
      let d = d
    }else{
      d = d.data
    }
    svg.select('.uptext').text(d.x)
    svg.select('.downtext').text(((d.y / this.config.sum) * 100).toFixed(1) + '%')
    svg.selectAll('.arc').classed('active', true)
    svg.selectAll('._arc_' + i).classed('active', false).transition().duration(500).attr('opacity', 1).attr('filter', 'url(#piefilter)')
    svg.selectAll('.rect').classed('active', true)
    svg.selectAll('._rect_' + i).classed('active', false).attr('opacity', 1).attr('filter', 'url(#piefilter)')   
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
