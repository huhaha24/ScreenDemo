import React,{Component} from 'react'
import Ajax from './../../axios'
import './index.less'
export default class Table extends Component{
    state={
        marginTop:0,
        data:[],
        timer:null
    }
    Marquee = ()=> {  
        if(this.state.marginTop < demo.offsetHeight){
             demo.setAttribute("style","margin-top:-"+this.state.marginTop+"px")
             this.state.marginTop = this.state.marginTop+2;
        }else{
            this.state.marginTop -=  demo.offsetHeight
         }
    }
    getDataJson=()=>{
        Ajax.ajax({'url':'table'}).then(data =>{
            this.setState({data:data.table})
            demo2.innerHTML = demo.innerHTML;    
        })
    }
    handle = (state)=>{
        if('in' == state){
            clearInterval(this.state.timer); 
        }else{
            this.state.timer = setInterval(this.Marquee, 50);
        }
    }
    componentWillMount(){
        this.getDataJson()
    }
    componentDidMount(){
        this.state.timer = setInterval(this.Marquee, 50);
    }
    render(){
        const showData = this.state.data.map((item)=>{
            return(
                <tr key={item.No}>  
                    <td align="center" style={{width:"15%"}}>{item.name}</td>  
                    <td align="center" style={{width:"20%"}}>{item.ip}</td>  
                    <td align="center" style={{width:"15%"}}>{item.department}</td>  
                    <td align="center" style={{width:"20%"}}>{item.depType}</td>  
                    <td align="center" style={{width:"30%"}}>{item.time}</td>  
                </tr>  
            )
        })
        return(
            <div className='tableContainer' onMouseOver={()=>this.handle('in')} onMouseOut={()=>{this.handle('out')}}>
                <div className='tableHeader'>
                    <table width='100%' height='25px' align="center">  
                    <tbody>
                        <tr>  
                            <td width="15%" align="center">姓名</td>  
                            <td width="20%" align="center">IP地址</td>  
                            <td width="15%" align="center">部门</td>  
                            <td width="20%" align="center">防护类型</td>  
                            <td width="30%" align="center">时间</td>  
                        </tr>  
                        </tbody>
                    </table>
                </div>
                <div className='tableContext'>
                    <div id="demo"> 
                        <table width="100%">
                            <tbody>
                            {showData}
                            </tbody>
                        </table>  
                    </div> 
                    <div id="demo2"></div> 
                </div>
            </div>  
        )
    }
}