import "core-js/stable";
import "regenerator-runtime/runtime";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import App from './App';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import reducer from './redux/reducers/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

export const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  )
);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App/>
    </Provider>
  </ThemeProvider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
