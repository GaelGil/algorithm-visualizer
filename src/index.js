import React from 'react';
import ReactDOM from 'react-dom/client';
import NavBar from './components/NavBar/navbar.jsx';
import AlgorithmVisualizer from './AlgorithmVisualizer/AlgorithmVisualizer.jsx';
import Controler from './components/Controler/controler.jsx';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NavBar /> 
    <AlgorithmVisualizer />
    <Controler />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
