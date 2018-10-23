import React, { Component } from 'react'
import * as d3 from 'd3'
import './index.less'
import Tip from '@utils/mapUtils/__Tip'

export default class Linechart extends Component {
  constructor(props){
    super(props)
    this.config={
      width:0,
      height:0,
      padding:25,
      showPath1:true,
      showPath2:true
    }
  }
  show() {
    const padding = this.config.padding
    const width = this.chartRef.parentElement.clientWidth
    const height = this.chartRef.parentElement.clientHeight
    this.config.width = width
    this.config.height = height
    let rectwidth = 18
    let rectheight = 10
    //dataset中是用getData方法生成的随机数
    let dataset1 = this.getData().dataset1;
    let dataset2 =this.getData().dataset2;
    
    let svg = d3.select(this.chartRef).attr('width',width).attr('height',height)
   
    let xScale = d3.scaleLinear().domain([0, dataset1.length - 1]).range([padding, width - padding])//添加横坐标比例尺
    let yScale = d3.scaleLinear().domain([0, this.config.height * 0.8]).range([height - padding, 50])//纵坐标比例尺
    let arc = d3.arc().outerRadius(6).innerRadius(5).startAngle(0).endAngle(2*Math.PI)
    let xInner = d3.axisBottom(xScale).ticks(dataset1.length)//X轴定义
    let yInner = d3.axisLeft(yScale).ticks(8)
    let max = d3.max([d3.max(dataset1), d3.max(dataset2)])
    let innerHeight = -(height - padding - yScale(max))

    svg.append("g")
      .append("text")
      .text("流量趋势图")
      .attr("class", "title")
      .attr("x", 0)
      .attr("y", 35)
      .attr('fill', '#fff')
      .style('font-size', '15px');

    svg.append("text")
      .attr('transform', `translate(${width/2 + padding*2},${padding})`)
      .attr('x', 0)
      .attr('y', 0)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .style("fill", "#fff")
      .style('font-size', '12px')
      .text("path1")

    svg.append('rect')
      .attr('class', 'path1')
      .attr('transform', `translate(${width / 2 + padding * 2},${padding})`)
      .attr('x', 6)
      .attr('y', 0)
      .attr('width', rectwidth)
      .attr('height', rectheight)
      .attr('fill', '#8166d8')
      .attr('rx',2)
      .attr('ry',2)
      .on('click', () => {
        this.handle('path1')
      })
      .style('cursor', 'hand')

    svg.append("text")
      .attr('transform', `translate(${(width / 3) * 2 + padding * 2},${padding})`)
      .attr('x', 0)
      .attr('y', 0)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .style("fill", "#fff")
      .style('font-size', '12px')
      .text("path2")

    svg.append('rect')
      .attr('class', 'path2')
      .attr('width', rectwidth)
      .attr('height', rectheight)
      .attr('fill', '#55e9ff')
      .attr('rx', 2)
      .attr('ry', 2)
      .attr('transform', `translate(${(width / 3) * 2 + padding * 2},${padding})`)
      .attr('x', 6)
      .attr('y', 0)
      .on('click', () => {
        this.handle('path2')
      })
      .style('cursor', 'hand')

    svg.append("defs").append("clipPath") // 添加遮罩
      .attr("id", "clip")
    　.append("rect")
      .attr("height", height)
      .attr("width", 0)
      .transition()
      .duration(3000)           
      .attr("width", width)
      
    let line = d3.line(dataset1)  //添加折线
      .x((d, i) => xScale(i))
      .y((d) => yScale(d))
      .curve(d3.curveCatmullRom)
    

    //添加X轴
    svg.append("g")
      .attr('class', "inner_line_x")
      .attr('transform', 'translate(0,' + yScale(0) + ')')
      .call(xInner)
    /*   .append("text")
      .attr('x',width)
      .attr('y',10)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .style("fill", "#000")
      .style('font-size','16px')
      .text("X") */

    //添加网格
    svg.selectAll('.inner_line_x .tick')
      .append('line')
      .attr('class', 'bg-line')
      .attr('stroke', 'rgba(0,0,0,0)')
      .attr('shape-rendering', 'crispEdges')   
      //.attr('y1', padding -yScale(0));
      .attr('y1',innerHeight); 

    svg.append("g")
      .attr("class", "inner_line_y")
      .attr("transform", "translate(" + padding + ",0)")
      .attr('stroke', 'rgba(0,0,0,0)')
      .call(yInner)
      /* .append("text")
      .attr('x',-10)
      .attr('y',padding)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .style("fill", "#000")
      .style('font-size','16px')
      .text("Y"); */

    svg.selectAll('.inner_line_y .tick')
      .append('line')
      .attr('class', 'bg-line')
      .attr('stroke', 'rgba(255,255,255,0)')
      .attr('shape-rendering', 'crispEdges')   
      .attr('x1', width - 2*padding); 
    
    let path = svg.append("path")
      .attr("d", line(dataset1))
      .attr('clip-path', 'url(#clip)') 
      .attr('id','path1')      
      .style("fill", "none")
      .style("stroke-width", 2)
      .style("stroke", "#8166d8")
      .style("stroke-opacity", 0.9)

    let path2 = svg.append("path")
      .attr('d', line(dataset2))
      .attr('clip-path', 'url(#clip)')
      .attr('id','path2')
      .style("fill", "none")
      .style("stroke-width", 2)
      .style("stroke", "#55e9ff")
      .style("stroke-opacity", 0.9)


 let circle = svg.append("g")
      .attr('class','circle')

    circle.selectAll('.circle')
      .data(dataset1)
      .enter()
      .append('circle')
      .attr('class','path1-circle')
      .style("fill", "rgba(255,255,255,0.5)")
      //.style("stroke", "rgba(255,255,255,0.5)")
      .style("stroke-opacity", 0.9)
      .on('mouseenter', function(d,i){
        let x = xScale(i).toFixed(1)
        let y = yScale(d).toFixed(1)
        d3.select(this).style('cursor', 'hand')
        Tip.showTooltip(`
           <span>数据</span> :<span class="v-tip-title">${d}</span><br />
           <span>坐标</span> : <span class="vapfont">(${x},${y})</span>
     `)
      }) 
      .on('mouseout', (d) =>{
        Tip.hideTooltip()
      }) 
      .attr('r',0)
      .transition()
      .delay(1000)
      .duration(2000)
      .attr('r',3) 
      .attr('cx', (d,i) => xScale(i))
      .attr('cy', (d) => yScale(d))  

      circle.selectAll('path1-arc')
      .data(dataset1)
      .enter()
      .append('path')
      .attr('class','path1-arc')
      .style("fill", "rgba(255,255,255,0.5)")
      .style("stroke-opacity", 0.9)
      .attr("transform", (d,i)=>{
        return `translate(${(xScale(i))},${(yScale(d))})`
      })
      .attr('d',arc())
      .style("fill", "rgba(255,255,255,0)")
      .transition()
      .delay(1000)
      .duration(2000)
      .style("fill", "rgba(255,255,255,0.5)")

    circle.selectAll('.circle')
      .data(dataset2)
      .enter()
      .append('circle')
      .attr('class', 'path2-circle')
      .style("fill", "rgba(255,255,255,0.5)")
      .style("stroke-opacity", 0.9)
      .on('mouseenter', function (d, i) {
        let x = xScale(i).toFixed(1)
        let y = yScale(d).toFixed(1)
        d3.select(this).style('cursor', 'hand')
        Tip.showTooltip(`
           <span>数据</span> :<span class="v-tip-title">${d}</span><br />
           <span>坐标</span> : <span class="vapfont">(${x},${y})</span>
     `)
      })
      .on('mouseout', (d) => {
        Tip.hideTooltip()
      })
      .attr('r', 0)
      .transition()
      .delay(1000)
      .duration(2000)
      .attr('r', 3)
      .attr('cx', (d, i) => xScale(i))
      .attr('cy', (d) => yScale(d)) 

    circle.selectAll('path2-arc')
      .data(dataset2)
      .enter()
      .append('path')
      .attr('class', 'path2-arc')
      .style("fill", "rgba(255,255,255,0.5)")
      .style("stroke-opacity", 0.9)
      .attr("transform", (d, i) => {
        return `translate(${(xScale(i))},${(yScale(d))})`
      })
      .attr('d', arc())
      .style("fill", "rgba(255,255,255,0)")
      .transition()
      .delay(1000)
      .duration(2000)
      .style("fill", "rgba(255,255,255,0.5)")
 
     
    let xTempScale = d3.scaleLinear().domain([padding, width - padding]).range([0, 13])
    svg.on('mousemove', () => {
      let x = d3.mouse(this.chartRef)[0]//获取鼠标滑过的坐标
      let y = d3.mouse(this.chartRef)[1]
      let xScale = xTempScale(x)
      if (y >= yScale(this.config.height * 0.8) && y <= yScale(0)) {
        if (xTempScale(x).toFixed(0) >= 0) {
          svg.selectAll('.inner_line_x .tick .bg-line')
            .attr('stroke', (d, i) => {
              if (xScale <= 13 && (xScale.toFixed(0) == i)) {
                return 'rgba(236,207,208,0.5)'
              } else {
                return 'rgba(0,0,0,0)'
              }
            })
        }
      } else {
        svg.selectAll('.inner_line_x .tick .bg-line').attr('stroke', 'rgba(0,0,0,0)')
      }
    })
  }
      
    getData = ()=> {
      let dataset1 = []
      let dataset2 = []
      for (let i = 1; i < 15; i++) {
        dataset1.push(Math.round(Math.random() * this.config.height * 0.8));
        dataset2.push(Math.round(Math.random() * this.config.height * 0.8));
      }
      return { dataset1, dataset2}
    }

    handle = (classname)=>{
      if(classname == 'path1'){
        this.config.showPath1 = !this.config.showPath1
        if (this.config.showPath1){
          d3.select('#path1')
            .transition()
            .duration(800)
            .style("stroke-width", 2)
          d3.selectAll('.path1-circle')
            .transition()
            .duration(800)
            .attr('r', 3)
          d3.selectAll('.path1-arc')
            .transition()
            .duration(800)
            .style("fill", "rgba(255,255,255,0.5)")
        }else{
          d3.select('#path1')
            .transition()
            .duration(800)
            .style("stroke-width", 0)
          d3.selectAll('.path1-circle')
            .transition()
            .duration(800)
            .attr('r', 0)
          d3.selectAll('.path1-arc')
            .transition()
            .duration(800)
            .style("fill", "rgba(255,255,255,0)")
        }
      } else if (classname == 'path2'){
        this.config.showPath2 = !this.config.showPath2
        if (this.config.showPath2){
          d3.select('#path2')
            .transition()
            .duration(800)
            .style("stroke-width", 2)
          d3.selectAll('.path2-circle')
            .transition()
            .duration(800)
            .attr('r', 3)
          d3.selectAll('.path2-arc')
            .transition()
            .duration(800)
            .style("fill", "rgba(255,255,255,0.5)")
        }else{
          d3.select('#path2')
            .transition()
            .duration(800)
            .style("stroke-width", 0)
          d3.selectAll('.path2-circle')
            .transition()
            .duration(800)
            .attr('r', 0) 
          d3.selectAll('.path2-arc')
            .transition()
            .duration(800)
            .style("fill", "rgba(255,255,255,0)")
        }       
      }
  }

    componentDidMount() {
    this.show();
  }

  render() {
    return (
        <div className= 'linechart'>
          <svg ref={(r) => this.chartRef = r}></svg>
        </div>
    )
  }
}