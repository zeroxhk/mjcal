import { enableMapSet } from 'immer';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './common/containers/App';

enableMapSet();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
