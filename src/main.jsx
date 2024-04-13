import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux.js'; // Importation du store Redux. 
import App from './App.jsx';
import './index.css';

// Création de la racine de l'application React avec ReactDOM.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Le composant Provider de react-redux permet à l'application React d'accéder au store Redux. */}
    <Provider store={store}>
      {/* App est le composant racine de votre application. */}
      <App />
    </Provider>
  </React.StrictMode>,
);
