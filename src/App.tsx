import React from 'react';
import logo from './assets/images/metaseguranca.jpg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
         Meta Segurança Eletrônica
        </p>
        <a
          className="App-link"
          href="http://www.metasegurancaeletronica.com.br/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Acesse o site ridiculo
        </a>
      </header>
    </div>
  );
}

export default App;
