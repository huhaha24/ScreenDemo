import React,{Component} from 'react'
import resize from '../../components/srceenResize'
import './index.less'
export default class Test extends Component{
    componentWillMount(){
        console.log(window)
        resize()
        window.addEventListener('resize',()=>{
            console.log('window has resize')
            resize()
        })
    }
    render(){
        return(
            <div className='container'>
                <div className = 'leftUp'>
                    <div className='img'/>
                </div>
                <div className = 'leftCenter'></div>
                <div className = 'leftBottom'></div>                
            </div>
        )
    }
}