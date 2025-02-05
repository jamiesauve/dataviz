import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import GraphContainer from './components/GraphContainer'
import UserControls from './components/UserControls';
import { AxisSelections } from './types/graph';

import './app.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const AppContent = () => {
  const [axisSelections, setAxisSelections] = useState<AxisSelections>({
    xAxis: '',
    yAxis: '',
    zAxis: ''
  });
  const [showPlot, setShowPlot] = useState(false);

  const handleShow = () => {
    if (axisSelections.xAxis && axisSelections.yAxis && axisSelections.zAxis) {
      setShowPlot(true);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <GraphContainer axisSelections={axisSelections} showPlot={showPlot} />
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
