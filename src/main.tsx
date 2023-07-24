import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import '@/styles/global.scss';
import '@/services/SharedServices/registerServices'
window['websit'] = ''
// register applications and start

const render = (Component: React.FunctionComponent) => {
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <Component/>
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
  );
}
render(App);
