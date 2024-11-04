import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Certifique-se de que este import está aqui
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* O Router deve estar aqui */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
