import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Importamos los estilos Sass
import './styles.scss';

// Importamos Provider de Redux y nuestro Store
import { Provider } from 'react-redux';
import { store } from './store/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);