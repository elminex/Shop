import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import 'normalize.css';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>, document.getElementById('root'),
);
