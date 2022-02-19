import { enableMapSet } from 'immer';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './common/containers/App';
import { AppContextsProvider } from './common/contexts/AppContexts';

enableMapSet();

ReactDOM.render(
  <React.StrictMode>
    <AppContextsProvider>
      <App />
    </AppContextsProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
