import React, { Component } from 'react'
import _ from 'lodash'
import * as d3 from 'd3'
import './index.less';

export default class Histogram extends Component {
  constructor(props) {
    super(props)
    this.config = {
      width: 0,
      height: 0,
      padding: 40,
      data: [],
      showGreen: true,
      showYellow: true,
      showRed: true,
    }
  }

  show() {
    const padding = this.config.padding
    const width = this.chartRef.parentElement.clientWidth - padding
    this.config.width = width
    let dataset =  [{ name: '湖北', value: 12, data: 0 },
                    { name: '北京', value: 24, data: 10 },
                    { name: '上海', value: 65, data: 20 },
                    { name: '四川', value: 86, data: 30 },
                    { name: '浙江', value: 48, data: 40 },
                    { name: '山西', value: 69, data: 50 },
                    { name: '内蒙古', value: 78, data: 60 },
                    { name: '新疆', value: 82, data: 70 },
                    { name: '甘肃', value: 78, data: 80 },
                    { name: '内蒙古', value: 78, data: 90 },
                    { name: '新疆', value: 82, data: 100 },
                    { name: '甘肃', value: 78, data: 110 },
                    { name: '湖北', value: 12, data: 120 },
                    { name: '北京', value: 24, data: 130 },
                    { name: '上海', value: 65, data: 140 },
                    { name: '四川', value: 86, data: 150 }];
    this.config.data = dataset
    this.config.height = dataset.length * 50
    let tipcolor = [{ color: '#49A5DD', text: '安全' },
    { color: '#FFA500', text: '警告' },
    { color: '#E95052', text: '危险' }];

    let svg = d3.select(this.chartRef).attr('width', width).attr('height', this.config.height)

    let linear = d3.scaleLinear()
      .domain([0, 100])
      .range([0, width - padding]);
    let rects = svg.append('g').attr('id', 'rects').attr('transform', "translate(" + padding / 2 + ",0)")
    rects.selectAll('.myrect')
      .data(dataset)
      .enter()
      .append('rect')
      .attr('class', 'myrect')
      .attr('x', 0)
      .attr('y', function (d, i) {
        return 50 * i + padding / 2
      })
      .attr('rx', 5)
      .attr('ry', 5)
      .attr('width', width - padding)
      .attr('height', 2.5)
      .attr('fill', 'rgba(220,220,220,0.5)')

    rects.selectAll('.uprect')
      .data(dataset)
      .enter()
      .append('rect')
      .attr('class', 'uprect')
      .attr('rx', 5)
      .attr('ry', 5)
      .attr('x', 0)
      .attr('y', function (d, i) {
        return 50 * i + padding / 2
      })
      .attr('width', 0)
      .attr('height', 2.5)
      .attr('fill', function (d) {
        if (d.value > 80) {
          return '#E95052'
        } else if (d.value < 30) {
          return '#49A5DD'
        } else {
          return '#FFA500'
        }
      })
      .transition()
      .duration(1000)
      .attr('width', function (d) {
        return linear(d.value)
      })

    rects.selectAll(".MyText")
      .data(dataset)
      .enter()
      .append("text")
      .attr("class", "MyText")
      .attr("x", 0)
      .attr("y", function (d, i) {
        return 50 * i + padding / 2
      })
      .attr("dy", -3)
      .text((d) => (d.name))
      //.attr('fill', '#49A5DD')
      .attr('fill','white')
      .append("text")

    rects.selectAll(".Text")
      .data(dataset)
      .enter()
      .append("text")
      .attr("class", "Text")
      .attr("x", function (d, i) {
        return (width / 2 + padding * 2);
      })
      .attr("y", function (d, i) {
        return 50 * i + padding / 2
      })
      .attr("dy", -2)
      .text(function (d) {
        return d.value;
      })
      .attr('fill','white')

  }

  handle = (type,e) =>{
    let svg = d3.select(this.chartRef)
    let array = ['.uprect', '.myrect', '.Text', '.MyText'] 
    let filtercount = 0
    if (e.target.localName == 'span'){
      this.changeOpacity(type, e)
      array.forEach((item) => {
        filtercount = this.filterData(item, svg)
      })
      svg.attr('height', filtercount * 50)
    } 
  }

  changeOpacity = (type,e) =>{
    let parent = e.target.parentElement;
    if(type == 'green'){
      this.config.showGreen = !this.config.showGreen
      if (this.config.showGreen) {
          e.target.parentElement.style.opacity = 1;
      } else {
        e.target.parentElement.style.opacity = 0.5;
      }
    }else if(type == 'yellow'){
      this.config.showYellow = !this.config.showYellow
      if(this.config.showYellow) {
        e.target.parentElement.style.opacity = 1;
      } else {
        e.target.parentElement.style.opacity = 0.5;
      }
    }else{
      this.config.showRed =!this.config.showRed
      if (this.config.showRed) {
        e.target.parentElement.style.opacity = 1;
      } else {
        e.target.parentElement.style.opacity = 0.5;
      }
    }
  }

  filterData = (classname,svg) =>{
    let filterdata = 0
      svg.selectAll(classname)
        .transition()
        .duration(1000)
        .attr('y', (d) => {
          if ((d.value <= 30 && this.config.showGreen) || (d.value > 30 && d.value <= 80 && this.config.showYellow) || (d.value > 80 && this.config.showRed)) {
            return (50 * filterdata++) + this.config.padding / 2
          }
        })
        .attr('height', (d) => {
          if ((d.value <= 30 && this.config.showGreen) || (d.value > 30 && d.value <= 80 && this.config.showYellow) || (d.value > 80 && this.config.showRed)){
            return 2.5
          }
        })
     return filterdata;
  }

  componentDidMount() {
    this.show();
  }

  render() {
    return (
      <div className='histogram'>
        <div className='header'>
          <span className='left'>威胁人员排行TOP7</span>
          <ul className='right'>
            <li onClick={(e) => this.handle('green',e)}>
              <span className='greenText'>安全</span>
              <span className='green'></span>
            </li>
            <li onClick={(e) => this.handle('yellow',e)}>
              <span className='yellowText'>警告</span>
              <span className='yellow'></span>
            </li>
            <li onClick={(e) => this.handle('red',e)}>
              <span className='redText'>危险</span>
              <span className='red'></span>
            </li>
          </ul>
        </div>
        <div className='content'>
          <svg ref={(r) => this.chartRef = r}></svg>
        </div>
      </div>
    )
  }
}