import React,{Component} from 'react'
import {Button,Icon} from 'antd'
import { connect } from 'react-redux'
import {changeMap} from '../../redux/actions/RootAction'
import Map from '@components/map'
import './index.less'
class MapContainer extends Component{
    handleGoBack= ()=>{
        const {dispatch} = this.props
        dispatch(changeMap('china'))
    }
    render(){
        const config={
            isColor:true,
            isShadow:false,
            isTip:true
        }
        if (this.props.mapName == 'china') {
            return (
                <div className='mapContainer'>
                    <Map mapName={this.props.mapName} {...config} />
                </div>
            )
        }else{
            return (
                <div className='mapContainer'>
                    <div className="btn" onClick={this.handleGoBack} disabled={this.props.disabled} ></div>
                    <Map mapName={this.props.mapName} {...config} />
                </div>
            )
        }       
    }
}
const mapStateToProps = (state) => {
    return {
        mapName:state.mapName,
        disabled:state.disabled
    }
  }
export default connect(mapStateToProps)(MapContainer)