import React, { Component } from 'react'
import Map from '../map'
import Table from '@components/table'
import Circle from '@components/percentCircle'
import Linechart from '@components/linechart'
import Histogram from '@components/histogram'
import Rectchart from '@components/rectchart'
import Pie from '@components/pie'
import Pie1 from '@components/pie1'
import Axischart from '@components/axisChart'
import './index.less'
export default class Home extends Component {
  render() {
    const headStyle = { height: 30 }
    let config={
      width : 200,
      height : 200,
      id:'circle',
      idname:1
    }
    return (
      <div className='home'>
        <div className='left'>
          <div className='leftUp bg'>
            <Histogram width = {config.width}/> 
          </div>
          <div className='leftDown bg'>
            <Linechart/> 
          </div>
        </div>
        <div className='middle'>
          <div className='middleUp bg'>
            <Map />
          </div>
          <div className='middleDown bg'>
            <Table />
          </div>
        </div>
        <div className='right'>
          <div className='rightUp bg'>
            <Pie1/>
          </div>
          <div className='rightDown bg'>
            <Rectchart/>
          </div>
        </div>
      </div>
    )
  }
}