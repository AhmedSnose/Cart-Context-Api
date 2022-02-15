import React from 'react';
import ReactDOM from 'react-dom';
import CartProvider from './store/CartProvider'



import './index.css';
import App from './App';
import Nav from './components/Nav';


ReactDOM.render(
  <React.StrictMode>
    <CartProvider>

    <App />

    </CartProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


