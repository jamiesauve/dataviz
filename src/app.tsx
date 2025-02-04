import React from 'react';
import ReactDOM from 'react-dom/client';
import GraphContainer from './components/GraphContainer'
import UserControls from './components/UserControls';

import './app.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <GraphContainer />
      <UserControls />
    </div>
  </React.StrictMode>
);
