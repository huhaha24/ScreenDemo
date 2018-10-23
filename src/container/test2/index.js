import React,{Component} from 'react'
import { Modal } from 'antd'
import { hashHistory} from 'react-router'
import './index.less'
export default class Test extends Component{
    state = {
        visible: false
    }
    onClickHandle=(value)=>{
        if(value){
            //window.open('/#/home')
            hashHistory.push('/home')
        }else{
            this.setState({
                visible: true,
            });
        }
    }
    handleCancel = () => {
        this.setState({ visible: false });
    }
    render(){
        return(
            <div className='container'>
                <div className='logo'>
                    <div className='Ctitle'>安全监测大数据平台</div>
                    <div className='Etitle'>SECURITY MONITORING BIG DATA PLATFORM</div>
                </div>
                <div className='content'>
                    <div className='box' onClick={()=>this.onClickHandle('')}>
                        <div className='upbox'>
                            <div className='plus'></div>
                        </div>
                        <div className='downbox'>态势感知</div>
                    </div>
                    <div className='box' onClick={() => this.onClickHandle('')}>
                        <div className='upbox'>
                            <div className='plus'></div>
                        </div>
                        <div className='downbox'>基础设置</div>
                    </div>
                    <div className='box' onClick={() => this.onClickHandle('')}>
                        <div className='upbox'>
                            <div className='plus'></div>
                        </div>
                        <div className='downbox'>综合设置</div>
                    </div>
                    <div className='box' onClick={() => this.onClickHandle('')}>
                        <div className='upbox'>
                            <div className='plus'></div>
                        </div>
                        <div className='downbox'>综合管理</div>
                    </div>
                </div>
                <Modal
                    visible={this.state.visible}
                    title={null}
                    //onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                    closable={false}
                    mask={true}
                    width={1050}
                    wrapClassName={'web'}>
                    <div className='top'>test</div>
                    <div className='box' onClick={()=>this.onClickHandle('home')}>
                        <div className='upbox'>
                            <div className='plus'></div>
                        </div>
                        <div className='downbox'>综合态势评估</div>
                    </div>
                    <div className='box' onClick={() => this.onClickHandle('home')}>
                        <div className='upbox'>
                            <div className='plus'></div>
                        </div>
                        <div className='downbox'>应用态势评估</div>
                    </div>
                    <div className='box' onClick={() => this.onClickHandle('home')}>
                        <div className='upbox'>
                            <div className='plus'></div>
                        </div>
                        <div className='downbox'>威胁态势评估</div>
                    </div>
                    <div className='box' onClick={() => this.onClickHandle('home')}>
                        <div className='upbox'>
                            <div className='plus'></div>
                        </div>
                        <div className='downbox'>人员态势评估</div>
                    </div>
                    <div className='box' onClick={() => this.onClickHandle('home')}>
                        <div className='upbox'>
                            <div className='plus'></div>
                        </div>
                        <div className='downbox'>流量态势评估</div>
                    </div>
                    <div className='box' onClick={() => this.onClickHandle('home')}>
                        <div className='upbox'>
                            <div className='plus'></div>
                        </div>
                        <div className='downbox'>攻击态势评估</div>
                    </div>
                    <div className='box' onClick={() => this.onClickHandle('home')}>
                        <div className='upbox'>
                            <div className='plus'></div>
                        </div>
                        <div className='downbox'>资产态势评估</div>
                    </div>
                </Modal>
            </div>
        )
    }
}