/**
 * 这个文件主要是为了验证react的生命周期怎么运行
 */
import React from 'react'
import * as d3 from 'd3'
import './index.less'

class LifeCycle extends React.Component{
  constructor(props){
    super(props)
    this.state = {str: 'hello'}
    console.log('初始化，接收props和state')
  }

  componentWillMount(){
    console.log('componentWillMount')
  }

  componentDidMount(){
    console.log('componentDidMount')
    console.log('*************************************')
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps)
    console.log('componentWillReceiveProps')
  }

  shouldComponentUpdate(){
    console.log('shouldComponentUpdate')
    return true;//如果state发生了更新，就会返回true
  }

  componentWillUpdate(){
    console.log('componentWillUpdate')
  }

  componentDidUpdate(){
    console.log('componentDidUpdate')
    console.log('*************************************')
  }

  componentWillUnmount(){
    console.log('componentWillUnmount')
  }

  setTheState(){
    let s = 'hello'
    if(this.state.str === s){
      s = 'HELLO'
    }
    this.setState({
      str: s
    })
  }

  forceItUpdate(){
    this.forceUpdate()
  }

  render(){
    console.log('render')
    return(
      <div>
        <span>{parseInt(this.props.num)}</span>
        <br/>
        <span>{this.state.str}</span>
      </div>
    )
  }
}

export default class Axischart extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      num: Math.random()*100
    }
  }

  propsChange=()=>{
    this.setState({
      num: Math.random() * 100
    })
  }

  setLifeCycleState=()=>{
    this.refs.rLifeCycle.setTheState();
  }

  forceLifeCycleUpdate=()=>{
    this.refs.rLifeCycle.forceItUpdate();
  }

  parentForceUpdate=()=> {
    this.forceUpdate();
  }



  render(){
    return(
      <div>
        <a href='javascript:;' onClick={this.propsChange}>propsChange</a><br />
        <a href='javascript:;' onClick={this.setLifeCycleState}>setLifeCycleState</a><br />
        <a href='javascript:;' onClick={this.forceLifeCycleUpdate}>forceLifeCycleUpdate</a><br />
        <a href='javascript:;' onClick={this.parentForceUpdate}>parentForceUpdate</a><br />
        <LifeCycle ref='rLifeCycle' num = {this.state.num}></LifeCycle>
      </div>
    )
  }
}