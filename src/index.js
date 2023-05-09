import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import './css/normalize.css';
import './css/skeleton.css';
import App from './App';

// BrouseRouter 컴포넌트 사용: 경로 관련 정보를 리액트 컴포넌트에서 사용할 수 있도록 해줌
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);