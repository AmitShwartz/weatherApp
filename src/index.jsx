import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { Provider } from "react-redux";
import Store from "./config/store";
import App from './components/App';

ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);