import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18에 맞게 수정
import App from './App'; // 기본 가져오기

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
