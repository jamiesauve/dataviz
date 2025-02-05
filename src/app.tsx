import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import GraphContainer from './components/GraphContainer'
import UserControls from './components/UserControls';
import { AxisSelections } from './types/graph';

import './app.css';

export const AppContent = () => {
  const [axisSelections, setAxisSelections] = useState<AxisSelections>({
    xAxis: 'a',
    yAxis: 'b',
    zAxis: 'c'
  });

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      height: '100vh',
      padding: '20px',
      gap: '20px',
      alignItems: 'center'
    }}>
      <div style={{ flex: 1 }}>
        <GraphContainer axisSelections={axisSelections} />
      </div>
      <UserControls
        axisSelections={axisSelections}
        onAxisChange={setAxisSelections}
      />
    </div>
  );
};

// Only run in browser, not during tests
if (typeof document !== 'undefined') {
  const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
  root.render(
    <React.StrictMode>
      <AppContent />
    </React.StrictMode>
  );
}
