import React from 'react';
import { Router, Route, hashHistory} from 'react-router'
import ChinaMap from '../container/map';
import Test from '../container/test'
import Test2 from '../container/test2'
//import Home from '../container/home'
import Home from '../container/home2'
export default () => (
  <Router history={hashHistory}>
      <Route path="/" component={Test2}/>      
      <Route path="/test" component={Test}/>      
      <Route path="/home" component={Home}/>      
    </Router>
  )