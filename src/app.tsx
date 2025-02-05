import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import GraphContainer from './components/GraphContainer'
import UserControls from './components/UserControls';
import { AxisSelections } from './types/graph';

import './app.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const AppContent = () => {
  const [axisSelections, setAxisSelections] = useState<AxisSelections>({
    xAxis: 'a',
    yAxis: 'b',
    zAxis: 'c'
  });
  const [showPlot, setShowPlot] = useState(false);

  const handleShow = () => {
    if (axisSelections.xAxis && axisSelections.yAxis && axisSelections.zAxis) {
      setShowPlot(true);
    }
  };

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
        <GraphContainer axisSelections={axisSelections} showPlot={showPlot} />
      </div>
      <UserControls
        axisSelections={axisSelections}
        onAxisChange={setAxisSelections}
        onShow={handleShow}
      />
    </div>
  );
};

root.render(
  <React.StrictMode>
    <AppContent />
  </React.StrictMode>
);
