import React, { useEffect } from 'react'
import logo from './logo.svg';
import './App.css';

function App() {
  useEffect(
    () => {
      window.addEventListener('message', (event)=>{
        if (event.data.method) {
          console.log("[front] addEventListener "+JSON.stringify(event.data))

          switch (event.data.method) {
            case "returnAddress":
              if (event.data.data == "EMPTY") {
                console.log("[front] returnAddress "+JSON.stringify(event.data))
              }
              break
          }
        }
      }, false);
      window.parent.postMessage({method:"getAddress", data:""}, '*');
    },[]
  )

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
