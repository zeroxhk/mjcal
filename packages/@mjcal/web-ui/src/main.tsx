import { enableMapSet } from 'immer';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './common/containers/App';
import { AppContextsProvider } from './common/contexts/AppContexts';

enableMapSet();

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppContextsProvider>
      <App />
    </AppContextsProvider>
  </React.StrictMode>,
);
