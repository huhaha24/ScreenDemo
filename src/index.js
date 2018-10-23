import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import configStore from './redux/reduxConfig';
import { Provider } from 'react-redux'
const store = configStore( {'mapName':'china','disabled':true} )
ReactDOM.render(
  <Provider store={store}>
    <Routes/>
  </Provider>,
  document.getElementById('root')
)
