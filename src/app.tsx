import { useState } from 'react';
import GraphContainer from './components/GraphContainer'
import UserControls from './components/UserControls';
import { AxisSelections } from './types/graph';
import { DataGeneratorProvider } from './contexts/DataGeneratorContext';

import './app.css';

export const AppContent = () => {
  const [axisSelections, setAxisSelections] = useState<AxisSelections>({
    xAxis: 'a',
    yAxis: 'b',
    zAxis: 'c'
  });

  return (
    <DataGeneratorProvider>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        height: '100vh',
        padding: '20px',
        gap: '20px',
        alignItems: 'center'
      }}>
        <div style={{ flex: 1 }}>
          <GraphContainer
            axisSelections={axisSelections}
          />
        </div>
        <UserControls
          axisSelections={axisSelections}
          onAxisChange={setAxisSelections}
        />
      </div>
    </DataGeneratorProvider>
  );
};
