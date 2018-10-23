import React,{Component} from 'react'
import { Modal, Card, Icon} from 'antd';
import Map from '../map'
import Table from '@components/table'
import Circle from '@components/percentCircle'
import Linechart from '@components/linechart'
import Histogram from '@components/histogram'
import Rectchart from '@components/rectchart'
import Rectchart1 from '@components/test'
import Pie from '@components/pie'
import './index.less'
export default class Home extends Component{
    render(){
        const headStyle = {height:30}
        return(
            <div className='home'>
                <div className='left'>
                    <Card title={<Icon type="star" className='iconStyle'>Top10</Icon>} className='leftUp' headStyle={headStyle}>
                        <Histogram id='histogram' />  
                    </Card>
                    <Card title={<Icon type="line-chart" className='iconStyle' >趋势图</Icon>} className='leftDown' headStyle={headStyle}>
                        <Linechart id='linechart'/>
                    </Card>
                </div>
                <div className='middle'>
                    <Card title={<Icon type="global" className='iconStyle'>地图</Icon>} className='middleUp' headStyle={headStyle}>
                        <Map/>
                    </Card>
                    <Card title={<Icon type="profile" className='iconStyle'>实时动态</Icon>} className='middleDown' headStyle={headStyle}>
                        <Table/>
                    </Card>
                </div>
                <div className='right'>
                    <Card title={<Icon type="pie-chart" className='iconStyle'>Top5</Icon>} className='rightUp' headStyle={headStyle}>
                        <Pie id='pie' />
                    </Card>
                    <Card title={<Icon type="bar-chart" className='iconStyle'>防护统计</Icon>} className='rightDown' headStyle={headStyle}>
                        <Rectchart id='rectchart' />
                    </Card>
                </div>
            </div>
        )
    }
}