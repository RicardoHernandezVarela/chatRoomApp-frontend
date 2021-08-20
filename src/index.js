import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/main.css';
import App from './App';

/* Import UserContext */
import { Provider } from './context';

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

